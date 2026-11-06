from pydantic import BaseModel
from datetime import datetime

class UsageSchema(BaseModel):
    count: int
    date:datetime

class AdminUsageResponse(BaseModel):
    id: int
    count: int
    date: datetime
    api_key_id:int
    user_id: int
    endpoint:str

class ApiKeyUsagesResponse(BaseModel):
    date:datetime
    total:int

class CommaNUsageSchema(BaseModel):
    total: int
    today: int

class EndpointSchema(CommaNUsageSchema):
    endpoint:str

class UsageResponseSchema(CommaNUsageSchema):
    api_key_name:str


class UpdateUsageSchema(UsageSchema):
    api_key_id:int
    endpoint:str