from sqlalchemy import Column,Integer,String,DateTime,Boolean,ForeignKey,Enum as SqlEnum
from db.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum

class UserRole(str,Enum):
    Free="free"
    Premium="premium"
    SuperUser="super"

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(100),nullable=False,index=True)
    email = Column(String(100),nullable=False,unique=True)
    password = Column(String(100),nullable=False)
    verification_token=Column(String(500),nullable=True)
    reset_token=Column(String(500),nullable=True)
    reset_token_expire=Column(DateTime,default=func.now())
    is_active = Column(Boolean,default=False)
    is_admin = Column(Boolean,default=False)
    is_superuser = Column(Boolean,default=False)
    api_keys=relationship('ApiKey',back_populates='user',lazy='dynamic')
    api_key_usages = relationship('ApiKeyUsage', back_populates='user', lazy='dynamic')
    joined_on = Column(DateTime,default=func.now())
    updated_on = Column(DateTime,default=func.now(),onupdate=func.now())
    refresh_tokens=relationship('RefreshToken',back_populates='user')

class RefreshToken(Base):
    __tablename__ = 'refresh_tokens'
    id = Column(Integer, primary_key=True,autoincrement=True)
    token=Column(String(1000),nullable=False)
    user_id=Column(Integer,ForeignKey('users.id'),nullable=False,index=True)
    expires=Column(DateTime,nullable=True)
    is_revoked = Column(Boolean,default=False)
    user=relationship('User',back_populates='refresh_tokens')

class ApiKey(Base):
    __tablename__ = 'api_keys'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name=Column(String(100),nullable=False)
    api_key=Column(String(500),unique=True)
    created_at = Column(DateTime, default=func.now())
    role=Column(SqlEnum(UserRole),nullable=False,default=UserRole.Free)
    user_id=Column(Integer, ForeignKey('users.id',ondelete='CASCADE'))
    user=relationship('User',back_populates='api_keys')
    api_key_usages=relationship('ApiKeyUsage',back_populates='api_key')

class ApiKeyUsage(Base):
    __tablename__ = 'api_key_usages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime)
    count=Column(Integer,default=0)
    endpoint=Column(String(100),nullable=False)
    api_key_id=Column(Integer,ForeignKey('api_keys.id',ondelete='CASCADE'))
    api_key=relationship('ApiKey',back_populates='api_key_usages')
    user_id=Column(Integer, ForeignKey('users.id',ondelete='CASCADE'))
    user=relationship('User',back_populates='api_key_usages')