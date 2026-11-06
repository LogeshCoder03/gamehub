from starlette.middleware.base import Request
from starlette.authentication import (AuthenticationBackend,
                                     AuthCredentials,
                                     UnauthenticatedUser,
                                      SimpleUser)
from jose import jwt,JWTError

from core.config import settings
from jose.exceptions import ExpiredSignatureError


class AuthBackend(AuthenticationBackend):
     async  def authenticate(self,request:Request):
         access_token=request.cookies.get('session_id')
         refresh_token=request.cookies.get('refresh_token')
         if refresh_token is None or access_token is None:
            request.state.user_data=None
            return AuthCredentials([]),UnauthenticatedUser()
         try:
             payload=jwt.decode(access_token,settings.SECRET_KEY,algorithms=[settings.ALGORITHM])
             user_id=payload.get('sub')
             username=payload.get('name')
             if username is None or user_id is None:
                 request.state.user_data = None
                 return AuthCredentials([]),UnauthenticatedUser()
             request.state.user_data = {
                 "username":username,
                 "id":int(user_id),
                 "is_superuser": payload.get('is_superuser'),
                 "is_admin": payload.get('is_admin'),
             }
             return AuthCredentials(["authenticated"]), SimpleUser(username)
         except (JWTError,ExpiredSignatureError):
            request.state.user_data = None
            return AuthCredentials([]), UnauthenticatedUser()