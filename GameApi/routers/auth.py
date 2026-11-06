from fastapi import (APIRouter,
                     Depends,
                     HTTPException,
                     status,
                     Response,
                     BackgroundTasks,
                     Request,
                     Query,
                     Body)

from core.config import settings
from schemas.auth import SignUpSchema,LoginSchema,UserSchema,IsAuthenticatedSchema
from sqlalchemy.orm import Session
from models.auth import User,RefreshToken
from db.database import get_db
from fastapi.responses import JSONResponse
from passlib.hash import pbkdf2_sha256
from core.utils import (create_access_token,
                        create_refresh_token,
                        hash_refresh_token,
                        only_allowed_hosts,
                        send_mail)
from datetime import timedelta,datetime
import secrets
import core.emails as emails

router=APIRouter(
    prefix="/auth",
    tags=["auth"],
    dependencies=[Depends(only_allowed_hosts)],
)

@router.post('/signup')
def register_user(data: SignUpSchema,request:Request,bg:BackgroundTasks,db:Session = Depends(get_db)):
    if request.user.is_authenticated:
        raise HTTPException(status_code=400,detail="Looks like you're already registered.try to logging in")
    is_email_exists=db.query(User).filter(User.email==data.email).first()
    is_username_exists=db.query(User).filter(User.username==data.username).first()
    if is_email_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="An account with this email already exists.Please log in or use a different email.")
    if is_username_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This username is already taken.Choose another one")
    hashed_password =pbkdf2_sha256.hash(data.password)
    verification_token=secrets.token_urlsafe(32)
    user=User(email=data.email,
              username=data.username,
              password=hashed_password,
            verification_token=verification_token
              )
    db.add(user)
    db.commit()
    verification_link=f"{request.headers.get("host")}/auth/verify-email?token={user.verification_token}"
    bg.add_task(send_mail,
                user.email,
                "Verify your email address",
                emails.EMAIL_VERIFICATION_MAIL.format(verification_link=verification_link),
                )
    db.refresh(user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={
        "message":"Registration successful! A verification email has been sent to your inbox.Please check your email and verify your account"
    })

@router.get('/verify-email')
def verify_email(request:Request,token=Query(...),db:Session = Depends(get_db)):
    user=db.query(User).filter(User.verification_token==token).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Verification token not found")
    user.is_active=True
    user.verification_token=None
    db.commit()
    db.refresh(user)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"user": "User verified"})

@router.post("/forgot-password")
def forgot_password(request:Request,bg:BackgroundTasks,data=Body(...),db:Session = Depends(get_db)):
    email=data.get("email")
    user=db.query(User).filter(User.email==email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User with the email not found.")
    token=secrets.token_urlsafe(32)
    user.reset_token=token
    user.reset_token_expire=datetime.now()+timedelta(minutes=10)
    reset_link=f"{settings.FRONTEND_DOMAIN}/reset-password?token={user.reset_token}"
    db.commit()
    bg.add_task(send_mail,
                user.email,
                "Reset Your Password",
                emails.RESET_PASSWORD_EMAIL_MAIL.format(reset_link=reset_link),
                )
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "If an account with this email exists,a password reset link has been sent"})

@router.post("/reset-password")
def reset_password(request:Request,token=Query(...),new_password:str=Body(...),db:Session = Depends(get_db)):
    user=db.query(User).filter(User.reset_token==token).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="The reset link is invalid or the account does not exist")
    if user.reset_token_expire < datetime.now():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="The password reset link has been expired.Please request a new one.")
    user.password=pbkdf2_sha256.hash(new_password)
    user.reset_token_expire=None
    user.reset_token=None
    db.commit()
    db.refresh(user)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "User password has been updated successfully.You can now log in eith your new password"})

@router.post("/login")
def login(data: LoginSchema,request:Request,response:Response,db:Session = Depends(get_db)):
    if request.user.is_authenticated:
        raise HTTPException(status_code=400,detail="You’re already signed in. Redirecting to your dashboard…")
    user=db.query(User).filter(User.email==data.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="No account found with these credentials.")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Your email is not verified. Please check your inbox for the verification link.")
    is_password_verified=pbkdf2_sha256.verify(data.password, user.password)
    if not is_password_verified:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="The email or password you entered is incorrect.")
    expires=timedelta(minutes=5)
    refresh_token = create_refresh_token()
    hashed_refresh_token=hash_refresh_token(refresh_token)
    db_refresh_token=RefreshToken(token=hashed_refresh_token,user_id=user.id,expires=datetime.now()+timedelta(days=5))
    db.add(db_refresh_token)
    db.commit()
    token=create_access_token(user.username,user.id,expires,user.is_superuser,user.is_admin)
    response.set_cookie('session_id',token,max_age=36000,httponly=True,secure=True,samesite='strict')
    response.set_cookie('refresh_token',refresh_token,max_age=36000,secure=True,samesite='strict',httponly=True)

@router.get('/logout')
def logout(request:Request,response:Response,db:Session = Depends(get_db)):
    if not request.user.is_authenticated:
        raise HTTPException(status_code=400,detail="You are already logged out.")
    refresh_token=db.query(RefreshToken).filter(RefreshToken.user_id==request.state.user_data["id"]).first()
    if not refresh_token:
        raise HTTPException(status_code=400,detail="You are already logged out.")
    refresh_token.is_revoked = True
    db.commit()
    db.refresh(refresh_token)
    response.delete_cookie('session_id')
    response.delete_cookie('refresh_token')

@router.get('/profile',response_model=UserSchema)
def user_details(request:Request,db:Session = Depends(get_db)):
    user_id=request.state.user_data["id"]
    user=db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404,detail="We couldn’t find this user profile.")
    return user

@router.get('/is_authenticated',response_model=IsAuthenticatedSchema)
def is_auth_user(request:Request):
    success=request.user.is_authenticated
    is_refresh_token= True if request.cookies.get('refresh_token') else False
    if request.state.user_data:
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"success": success,
                                     "is_superuser":request.state.user_data['is_superuser'],
                                     "is_admin":request.state.user_data['is_admin'],
                                     })
    return JSONResponse(status_code=status.HTTP_200_OK, content={"success": success,"is_refresh_token":is_refresh_token})

@router.get('/refresh-token')
def refresh_new_token(request:Request,response:Response,db:Session = Depends(get_db)):
    if request.user.is_authenticated:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User is already logged in")
    token=request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=400,detail="User logged out")
    hashed_refresh_token=hash_refresh_token(token)
    refresh_token=db.query(RefreshToken).filter(RefreshToken.token==hashed_refresh_token).first()
    if not refresh_token:
        raise HTTPException(status_code=404,detail="Refresh token not found")
    if refresh_token.is_revoked:
        raise HTTPException(status_code=400,detail="Refresh token is already revoked")
    user = db.query(User).get(refresh_token.user_id)
    access_token=create_access_token(
        user.username,
        user.id,
        timedelta(minutes=5),
        user.is_superuser,
        user.is_admin,
    )
    response.set_cookie('session_id',access_token,max_age=36000,secure=True,samesite='strict',httponly=True)

