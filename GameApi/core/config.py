from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List

class Settings(BaseSettings):
    SECRET_KEY: str
    DEBUG: bool=False
    DATABASE_URI: str
    API_PREFIX:str
    ALGORITHM: str
    EMAIL_HOST:str
    EMAIL_PASSWORD:str
    FRONTEND_DOMAIN:str
    ALLOWED_ORIGINS:str=""
    ALLOWED_HEADERS:str=""

    @field_validator("ALLOWED_HEADERS")
    def allowed_headers_validator(cls, v):
        allowed_headers:List[str] = v.split(",") if v else []
        return allowed_headers

    @field_validator("ALLOWED_ORIGINS")
    def allowed_hosts_validator(cls, v):
        allowed_origins:List[str] = v.split(",") if v else []
        return allowed_origins

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()