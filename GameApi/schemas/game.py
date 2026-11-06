from pydantic import BaseModel
from datetime import datetime
from typing import Optional,List,Any
from enum import Enum
from models.game import Popularity,GameType

class AvailableOn(str,Enum):
    Pc="pc"
    Mobile="mobile"
    PlayStation="playstation"
    Xbox="xbox"
    UnAvailable="unavailable"

class BaseGameSchema(BaseModel):
    id: int

class GameSchema(BaseModel):
    name: str
    logo:Optional[Any]=None
    description:str

class GameDeveloperSchema(BaseModel):
    founder: str
    published_at:datetime
    made_in:str
    class Config:
        from_attributes=True

class GameDetailsSchema(BaseModel):
    is_conduct_tournament:Optional[bool]=False
    ratings:Optional[float]=None
    type:Optional[GameType]=None
    downloads:int
    category:str
    available_on:Optional[List[AvailableOn]]
    popularity:Popularity
    class Config:
        from_attributes=True

class FullGameSchema(GameSchema,GameDeveloperSchema,GameDetailsSchema):
    is_approved:Optional[bool]=False
    class Config:
        from_attributes=True

class MainDetailsSchema(BaseModel):
    downloads:int
    type: str
    ratings:Optional[float]

class MainDevelopmentDetails(BaseModel):
    published_at:datetime

class GameResponseSchema(BaseGameSchema,GameSchema):
    development_details:MainDevelopmentDetails
    details:MainDetailsSchema
    total_pages:Optional[int]=None
    class Config:
        from_attributes=True

class FullGameResponse(BaseGameSchema,GameSchema):
    development_details:GameDeveloperSchema
    details:GameDetailsSchema
    is_approved:bool
    class Config:
        from_attributes=True

class ResponseWithPaginationSchema(BaseModel):
    page:int
    total_pages:Optional[int]=None
    total_data:Optional[int]=None
    data:List[GameResponseSchema]=[]
    class Config:
        from_attributes=True

class GameMetadata(BaseModel):
    total_games:int=0
    indoor_games:int=0
    outdoor_games:int=0
    online_games:int=0