from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from models.auth import UserRole


class BaseSchema(BaseModel):
    id: int

class AdminApiKeySchema(BaseSchema):
    name: str
    api_key: str
    created_at: datetime
    user_id: int
    role:str

class DateSchema(BaseModel):
    joined_on: datetime
    updated_on: datetime

class PasswordSchema(BaseModel):
    password: str

class BaseUserSchema(BaseModel):
    username: str
    email: str
    is_admin: bool=False
    is_active: bool=False
    is_superuser: bool=False

class UserSchema(BaseUserSchema,BaseSchema):
    pass

class AdminUserSchema(BaseSchema,BaseUserSchema,PasswordSchema,DateSchema):
    pass

class CreateUserSchema(BaseUserSchema,PasswordSchema):
    pass

class CreateApiKeySchema(BaseModel):
    name: str
    api_key: str
    user_id: int
    role:Optional[UserRole]="free"

class CreateUsageSchema(BaseModel):
    api_key_id: int
    count: int
    date: datetime
    endpoint:str