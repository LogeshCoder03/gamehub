from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi.requests import Request
from core.config import settings

def get_access_key(request: Request):
    access_key = request.headers.get('X-API-KEY')
    origin=request.headers.get("origin")
    is_superuser=request.state.user_data.get("is_superuser",False) if request.state.user_data else False
    is_admin=request.state.user_data.get("is_admin",False) if request.state.user_data else False
    if is_superuser or is_admin or origin in settings.ALLOWED_ORIGINS:
        return None
    if not access_key:
        return get_remote_address(request)
    return access_key

def set_limit():
    return "10/minute"

limiter=Limiter(key_func=get_access_key)