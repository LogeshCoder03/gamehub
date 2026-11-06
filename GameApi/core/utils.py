from datetime import datetime
from jose import jwt
from fastapi import HTTPException,Request,Depends,Response
from core.config import settings
from fastapi import status
import secrets
import hashlib
from models.auth import RefreshToken
from sqlalchemy.orm import Session, joinedload
from email.message import EmailMessage
import aiosmtplib

def create_access_token(username:str,
                        user_id:int,
                        timedelta,
                        is_superuser:bool=False,
                        is_admin:bool=False,):
    encode={"sub":str(user_id),
            "name":username,
            "is_superuser":is_superuser,
            "is_admin":is_admin}
    expires=datetime.now() - timedelta
    encode.update({'exp':expires})
    token=jwt.encode(encode,settings.SECRET_KEY,settings.ALGORITHM)
    return token


def hash_refresh_token(token):
    return hashlib.sha256(token.encode()).hexdigest()

def verify_refresh_token(refresh_token:str,db:Session):
    hashed_token=hash_refresh_token(refresh_token)
    db_token=db.query(RefreshToken).options(joinedload(RefreshToken.user)).filter(RefreshToken.token==hashed_token,RefreshToken.is_revoked==False).first()
    if db_token is None:
        raise HTTPException(status_code=404,detail="Token not found")
    return db_token

def create_refresh_token():
    return secrets.token_urlsafe(64)

def get_current_user(request:Request):
    if not request.user.is_authenticated:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="token is or invalid")
    return request.user.id

def only_admin_area(request:Request):
    if request.state.user_data:
        is_superuser=request.state.user_data.get('is_superuser')
        is_admin=request.state.user_data.get('is_admin')
        if not is_superuser and not is_admin:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="You do not have permission to access this resource")
        return request.user.id
    else:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)

def only_allowed_hosts(request:Request):
    host=request.headers.get('origin')
    if not host:
        return None
    if host not in settings.ALLOWED_ORIGINS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return None

async def send_mail(to,subject,body,**kwargs):
    message=EmailMessage()
    message["From"]=settings.EMAIL_HOST
    message["To"]=to
    message["Subject"]=subject
    message.set_content(body)

    await aiosmtplib.send(
        message,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username=settings.EMAIL_HOST,
        password=settings.EMAIL_PASSWORD,
    )