from datetime import datetime

from fastapi import APIRouter,HTTPException,Depends,status,Request,Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, joinedload
from models.auth import ApiKey,ApiKeyUsage,User
from db.database import get_db
from schemas.api_key import ApiKeyResponseSchema,ApiKeySchema
from schemas.usages import ApiKeyUsagesResponse,UsageResponseSchema,EndpointSchema
import secrets
from core.utils import get_current_user,only_allowed_hosts
from typing import List
from sqlalchemy import func,case

router = APIRouter(
    prefix="/apikey",
    tags=["apikey"],
    dependencies=[Depends(only_allowed_hosts),Depends(get_current_user)],
)

@router.get("/",response_model=List[ApiKeyResponseSchema])
def get_api_keys(request:Request,db:Session=Depends(get_db)):
    api_keys=db.query(ApiKey).filter(ApiKey.user_id == request.state.user_data["id"]).all()
    return api_keys

@router.post('/',response_model=ApiKeyResponseSchema,status_code=status.HTTP_201_CREATED)
def create_api_key(request:Request,data:ApiKeySchema,db: Session = Depends(get_db)):
    token_encoded=secrets.token_urlsafe(64)
    token=f"ghv1-{token_encoded}"
    api_key = ApiKey(
        name=data.name,
        api_key=token,
        user_id=request.state.user_data["id"],
    )
    if request.state.user_data:
        auth_role="super" if request.state.user_data["is_superuser"] or request.state.user_data["is_admin"] else "free"
        api_key.role=auth_role
    db.add(api_key)
    db.commit()
    db.refresh(api_key)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={
        "name":api_key.name,
        "api_key":token
    })

@router.delete('/{api_key_id}')
def delete_api_key(request:Request,api_key_id:int,db:Session=Depends(get_db)):
    api_key=db.query(ApiKey).get(api_key_id)
    if not api_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API Key not found")
    if api_key.user_id!=request.state.user_data["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="You are not authorized to perform this action")
    db.delete(api_key)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get('/usages',response_model=List[ApiKeyUsagesResponse])
def get_api_usages(request:Request,db:Session=Depends(get_db)):
    usages=db.query(ApiKeyUsage.date.label("date"),func.sum(ApiKeyUsage.count).label("total")).filter(
        ApiKeyUsage.user_id == request.state.user_data["id"]
    ).group_by(ApiKeyUsage.date).order_by(ApiKeyUsage.date).all()
    return usages

@router.get("/usages/api-keys",response_model=List[UsageResponseSchema])
def get_usages_based_on_apikey(request:Request,db:Session=Depends(get_db)):
    try:
        today = datetime.today().strftime("%Y-%m-%d")
        usages=(db.query(ApiKey.name.label("api_key_name"),
                        func.sum(ApiKeyUsage.count).label("total"),
                        func.sum(
                            case(
                                (func.date(ApiKeyUsage.date)==today,ApiKeyUsage.count),
                                else_=0)
                        ).label("today")).join(ApiKeyUsage,ApiKeyUsage.api_key_id==ApiKey.id).filter(
            ApiKey.user_id == request.state.user_data["id"]
        ).group_by(ApiKey.name).all())
        return  usages
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API Key not found")


@router.get("/usages/endpoints",response_model=List[EndpointSchema])
def endpoints(request:Request,db:Session=Depends(get_db)):
    try:
        today=datetime.today().strftime("%Y-%m-%d")
        usages=(db.query(ApiKeyUsage.endpoint.label("endpoint"),
                        func.sum(ApiKeyUsage.count).label("total"),
                        func.sum(
                            case(
                                (func.date(ApiKeyUsage.date)==today,ApiKeyUsage.count),
                                else_=0)
                        ).label("today")).filter(
            ApiKeyUsage.user_id == request.state.user_data["id"]
        ).group_by(ApiKeyUsage.endpoint).all())
        return usages
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API Key not found")