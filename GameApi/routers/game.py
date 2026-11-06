from fastapi import APIRouter,Depends,HTTPException,status,Query,File,UploadFile,Form,Request
from datetime import  datetime
from models.game import Game,GameDetails,GameDeveloper
from sqlalchemy.orm import Session
from db.database import get_db
from typing import Any
import json
from schemas.game import GameResponseSchema,FullGameResponse,ResponseWithPaginationSchema,GameMetadata
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import joinedload
from core.utils import only_admin_area
import uuid
import shutil
from models.auth import ApiKey,ApiKeyUsage
from core.rate_limit import limiter,set_limit
from pathlib import Path

router=APIRouter(
    prefix="/games",
    tags=["game"],
)

api_key_header = APIKeyHeader(name="X-API-KEY")
UPLOAD_DIR=Path("uploads/logos")
UPLOAD_DIR.mkdir(parents=True,exist_ok=True)

def check_api_key_header(db:Session, api_key:APIKeyHeader,path:str):
    key=db.query(ApiKey).filter(ApiKey.api_key==api_key).first()
    if key:
        today = datetime.today().strftime('%Y-%m-%d')
        usage = db.query(ApiKeyUsage).filter(
            ApiKeyUsage.api_key_id == key.id, ApiKeyUsage.date == today,ApiKeyUsage.endpoint==path).first()
        if not usage:
            usage = ApiKeyUsage(
                api_key=key,
                date=today,
                user_id=key.user_id,
                endpoint=path
            )
            db.add(usage)
            db.commit()
        usage.count += 1
        db.commit()
        db.refresh(usage)
        return True
    return False

@router.post('/',dependencies=[Depends(only_admin_area)],response_model=GameResponseSchema)
def create_game(name:str=Form(...),
                description:str=Form(...),
                logo:UploadFile=File(...),
                founder:str=Form(...),
                published_at:datetime=Form(...),
                made_in:str=Form(...),
                is_conduct_tournament:bool=Form(...),
                game_type:str=Form(...),
                category:str=Form(...),
                popularity:str=Form(...),
                downloads:int=Form(...),
                available_on:Any=Form(...),
                ratings:float=Form(...),
                db:Session=Depends(get_db)):
    available_on_data=json.loads(available_on)
    ext=logo.filename.split(".")[-1]
    filename=f"{uuid.uuid4()}.{ext}"
    file_path=UPLOAD_DIR/filename
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(logo.file, buffer)
    try:
        game=Game(
            name=name,
            description=description,
            logo=str(file_path),
        )
        game_developer=GameDeveloper(
            founder=founder,
            published_at=published_at,
            made_in=made_in,
        )
        game_details=GameDetails(
            is_conduct_tournament=is_conduct_tournament,
            type=game_type,
            category=category,
            popularity=popularity,
            available_on=available_on_data,
            downloads=downloads,
            ratings=ratings
        )
        game.development_details=game_developer
        game.details=game_details
        db.add(game)
        db.commit()
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Error occured,try again")
    return game

@router.get('/',response_model=ResponseWithPaginationSchema)
@limiter.limit(set_limit)
def get_all_games(request:Request,
                  page:int=Query(1),
              search:str|None=Query(None),
              popularity:str|None=Query(None),
              game_type:str|None=Query(None),
              api_key=Depends(api_key_header),
              db:Session=Depends(get_db)):
    is_valid_api_key=check_api_key_header(db, api_key,"/games")
    if not is_valid_api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Api Key is invalid")
    try:
        query=db.query(Game).join(GameDetails).options(joinedload(Game.details)).filter(Game.is_approved==True)
        page_size = 2
        offset = (page - 1) * page_size
        total_data = db.query(Game).count()
        total = (total_data + page_size - 1) // page_size
        if search:
            query=query.filter(Game.name.ilike(f"%{search}%"))
        if game_type:
            query=query.filter(GameDetails.type==game_type)
        if popularity:
            query=query.filter(GameDetails.popularity==popularity)
        data=query.limit(page_size).offset(offset).all()
        return {
            "data": data,
            "total_pages": total,
            "total_data": total_data,
            "page": page,
        }
    except Exception as error:
        raise HTTPException(status_code=404, detail="Error getting games")

@router.get("/metadata",response_model=GameMetadata)
def game_metadata(request:Request,api_key=Depends(api_key_header),db:Session=Depends(get_db)):
    is_valid_api_key=check_api_key_header(db, api_key,"/games/metadata")
    if not is_valid_api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Api Key is invalid")
    try:
        query=db.query(Game).join(GameDetails).filter(Game.is_approved==True)
        total_games=query.count()
        indoor_games=query.filter(GameDetails.type=="indoor").count()
        outdoor_games=query.filter(GameDetails.type=="outdoor").count()
        online_games=query.filter(GameDetails.type=="online").count()
        return {
            "total_games": total_games,
            "indoor_games": indoor_games,
            "outdoor_games": outdoor_games,
            "online_games": online_games,
        }
    except Exception as error:
        raise HTTPException(status_code=404, detail="Error getting game Metadata")

@router.get('/{game_id}',response_model=FullGameResponse)
def get_game(game_id:int,api_key=Depends(api_key_header),db:Session=Depends(get_db)):
    is_valid_api_key=check_api_key_header(db, api_key,"games/{game_id}")
    if not is_valid_api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Api Key is invalid")
    try:
        game=db.query(Game).options(
            joinedload(Game.development_details),
            joinedload(Game.details)
        ).get(game_id)
        if game is None:
            raise HTTPException(status_code=404,detail="Game not found")
        return game
    except Exception as error:
        raise HTTPException(status_code=404,detail="Error getting game")
