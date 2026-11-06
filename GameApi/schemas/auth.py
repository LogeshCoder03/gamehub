from pydantic import BaseModel

class LoginSchema(BaseModel):
    email: str
    password: str

class SignUpSchema(LoginSchema):
    username: str

class UserSchema(BaseModel):
    id:int
    username: str
    email: str

class IsAuthenticatedSchema(BaseModel):
    success: bool
    is_superuser: bool=False
    is_admin: bool=False