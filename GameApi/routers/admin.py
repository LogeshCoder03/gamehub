from models.auth import User,ApiKey,ApiKeyUsage
from models.game import Game,GameDeveloper,GameDetails
from fastapi import (APIRouter,
                     Depends,
                     HTTPException,
                     status,
                     Response,
                     UploadFile,
                     File)
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.admin import AdminUserSchema,AdminApiKeySchema,BaseUserSchema,UserSchema
from typing import List
from core.utils import only_admin_area,get_current_user,only_allowed_hosts
from schemas.api_key import ApiKeySchema,ApiKeyUpdateSchema
from schemas.game import FullGameResponse,FullGameSchema,GameResponseSchema
from schemas.admin import CreateUserSchema,CreateApiKeySchema,CreateUsageSchema
from passlib.hash import pbkdf2_sha256
from schemas.usages import AdminUsageResponse,UpdateUsageSchema
import uuid
from pathlib import Path
import shutil

UPLOAD_DIR=Path("uploads/logos")
UPLOAD_DIR.mkdir(parents=True,exist_ok=True)

router=APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(only_allowed_hosts),Depends(get_current_user),Depends(only_admin_area)]
)

@router.post('/users')
def create_user(user_data:CreateUserSchema,db: Session = Depends(get_db)):
    is_email_exists=db.query(User).filter(User.email==user_data.email).first()
    is_username_exists=db.query(User).filter(User.username==user_data.username).first()
    if is_email_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    if is_username_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    hashed_password =pbkdf2_sha256.hash(user_data.password)
    user=User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
        is_admin=user_data.is_admin,
        is_active=user_data.is_active,
        is_superuser=user_data.is_superuser,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content="User created")

@router.get('/users',response_model=List[AdminUserSchema])
def get_all_users(db:Session=Depends(get_db)):
    users=db.query(User).all()
    return users

@router.delete('/users/{user_id}')
def delete_user(user_id:int,db:Session=Depends(get_db)):
    user=db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put('/users/{user_id}',response_model=UserSchema)
def update_user(user_id:int,user_data:BaseUserSchema,db:Session=Depends(get_db)):
    user=db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.username=user_data.username
    user.email=user_data.email
    user.is_admin=user_data.is_admin
    user.is_active=user_data.is_active
    user.is_superuser=user_data.is_superuser
    db.commit()
    db.refresh(user)
    return JSONResponse(status_code=status.HTTP_200_OK,content="User updated")

@router.post('/api-keys')
def create_api_key(data:CreateApiKeySchema,db:Session=Depends(get_db)):
    user=db.query(User).get(data.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    api_key=ApiKey(
        name=data.name,
        api_key=data.api_key,
        user_id=user.id,
        role=data.role
    )
    db.add(api_key)
    db.commit()
    return JSONResponse(status_code=status.HTTP_201_CREATED, content="API key created")

@router.get("/api-keys",response_model=List[AdminApiKeySchema])
def get_all_api_keys(db:Session=Depends(get_db)):
    api_keys=db.query(ApiKey).all()
    return api_keys

@router.delete('/api-keys/{api_key_id}')
def delete_api_key(api_key_id:int,db:Session=Depends(get_db)):
    api_key=db.query(ApiKey).get(api_key_id)
    if not api_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(api_key)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put('/api-keys/{api_key_id}',response_model=ApiKeySchema)
def update_api_key(api_key_id:int,api_key_data:ApiKeyUpdateSchema,db:Session=Depends(get_db)):
    api_key=db.query(ApiKey).get(api_key_id)
    user=db.query(User).get(api_key_data.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    if not api_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Api key not found")
    api_key.user_id=api_key_data.user_id
    api_key.name=api_key_data.name
    api_key.api_key=api_key_data.api_key
    api_key.role=api_key_data.role
    db.commit()
    db.refresh(api_key)
    return JSONResponse(status_code=status.HTTP_200_OK,content="API Key updated.")


@router.get('/games',response_model=List[FullGameResponse])
def get_all_games(db:Session=Depends(get_db)):
    games=db.query(Game).all()
    return games

@router.put('/games/{game_id}',response_model=GameResponseSchema,dependencies=[Depends(only_admin_area)])
def update_game(game_id:int,request:FullGameSchema,db:Session=Depends(get_db)):
    try:
        game=db.get(Game,game_id)
        if game is None:
            return HTTPException(status_code=404,detail="Game not found")
        game.name=request.name
        game.description=request.description
        game.logo=request.logo
        game.is_approved=request.is_approved
        game_developer=db.query(GameDeveloper).filter(GameDeveloper.game_id==game_id).first()
        game_developer.founder=request.founder
        game_developer.published_at=request.published_at
        game_developer.made_in=request.made_in
        game_details=db.query(GameDetails).filter(GameDetails.game_id==game_id).first()
        game_details.is_conduct_tournament=request.is_conduct_tournament
        game_details.category=request.category
        game_details.popularity=request.popularity
        game_details.available_on=request.available_on
        game_details.downloads=request.downloads
        game_details.type=request.type
        game_details.ratings=request.ratings
        game.development_details=game_developer
        game.details=game_details
        db.commit()
        db.refresh(game)
        return JSONResponse(status_code=status.HTTP_200_OK,content="Game updated.")
    except Exception as error:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Error occured.try again later")

@router.delete('/games/{game_id}',dependencies=[Depends(only_admin_area)])
def delete_game(game_id:int,db:Session=Depends(get_db)):
    game=db.query(Game).get(game_id)
    if not game:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found")
    db.delete(game)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/key-usages")
def create_key_usage(usage_data:CreateUsageSchema,db:Session=Depends(get_db)):
    api_key=db.query(ApiKey).get(usage_data.api_key_id)
    if not api_key:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Api key not found")
    date = usage_data.date.strftime("%Y-%m-%d")
    key_usage=ApiKeyUsage(
        api_key_id=api_key.id,
        count=usage_data.count,
        date=date,
        endpoint=usage_data.endpoint,
        user_id=api_key.user_id,
    )
    db.add(key_usage)
    db.commit()
    return JSONResponse(status_code=status.HTTP_201_CREATED,content="Api key usage created")

@router.get("/key-usages",response_model=List[AdminUsageResponse])
def get_all_usages(db:Session=Depends(get_db)):
    usages=db.query(ApiKeyUsage).all()
    return usages

@router.put("/key-usages/{usage_id}",response_model=AdminUsageResponse)
def update_api_key_usage(usage_id:int,data:UpdateUsageSchema,db:Session=Depends(get_db)):
    usage=db.query(ApiKeyUsage).get(usage_id)
    if not usage:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Failed to fetch usage")
    api_key=db.query(ApiKey).get(data.api_key_id)
    if not api_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Api key not found")
    date=data.date.strftime("%Y-%m-%d")
    usage.api_key_id=data.api_key_id
    usage.count=data.count
    usage.endpoint=data.endpoint
    usage.date=date
    db.commit()
    db.refresh(usage)
    return JSONResponse(status_code=status.HTTP_200_OK,content="Api key usage updated")


@router.delete('/key-usages/{usage_id}',dependencies=[Depends(only_admin_area)])
def delete_usage(usage_id:int,db:Session=Depends(get_db)):
    usage=db.query(ApiKeyUsage).get(usage_id)
    if not usage:
        return HTTPException(status_code=404, detail="Key Usage not found")
    db.delete(usage)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/games/update-logo/{game_id}')
def update_logo(game_id:int,logo:UploadFile=File(...),db:Session=Depends(get_db)):
    game=db.query(Game).get(game_id)
    if game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Game not found")
    ext=logo.filename.split(".")[-1]
    extensions=["png","jpg","jpeg"]
    if ext not in extensions:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Only image files are allowed")
    filename=f"{uuid.uuid4()}.{ext}"
    file_path=UPLOAD_DIR/filename
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(logo.file, buffer)
    game.logo=str(file_path)
    return JSONResponse(status_code=status.HTTP_200_OK, content="Logo Updated Successfully")