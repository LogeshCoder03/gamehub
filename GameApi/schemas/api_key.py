from pydantic import BaseModel
from datetime import datetime
from models.auth import UserRole
from typing import Optional

class ApiKeySchema(BaseModel):
    name: str

class ApiKeyResponseSchema(ApiKeySchema):
    id:int
    api_key:str
    created_at:datetime

class ApiKeyUpdateSchema(ApiKeySchema):
    api_key:str
    name:str
    role:Optional[UserRole]="free"
    user_id:int
