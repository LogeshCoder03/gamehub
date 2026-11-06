from db.database import Base
from sqlalchemy import Column,Integer,String,DateTime,ForeignKey,Boolean,Enum as SqlEnum,JSON,Float
from sqlalchemy.orm import relationship
from enum import Enum
from sqlalchemy.sql import func

class Popularity(str,Enum):
    Extreme="extreme"
    High="high"
    Medium="medium"
    Low="low"

class GameType(str,Enum):
    Indoor="indoor"
    Outdoor="outdoor"
    Online="online"

class Game(Base):
    __tablename__='game'
    id=Column(Integer,primary_key=True,autoincrement=True,index=True)
    name=Column(String(100))
    logo=Column(String(100))
    description=Column(String(1000),nullable=True)
    is_approved=Column(Boolean,default=False)
    created=Column(DateTime,default=func.now())
    details=relationship("GameDetails",back_populates="game",uselist=False,cascade="all,delete")
    development_details=relationship("GameDeveloper",back_populates="game",uselist=False,cascade="all,delete")

class GameDeveloper(Base):
    __tablename__='game_developer'
    id=Column(Integer,primary_key=True,autoincrement=True,index=True)
    founder=Column(String(100))
    published_at=Column(DateTime)
    made_in=Column(String(100))
    game_id=Column(Integer,ForeignKey('game.id',ondelete="CASCADE"),index=True,unique=True)
    game=relationship("Game",back_populates="development_details")

class GameDetails(Base):
    __tablename__='game_details'
    id=Column(Integer,primary_key=True,autoincrement=True,index=True)
    game_id=Column(Integer,ForeignKey('game.id',ondelete="CASCADE"),index=True,unique=True)
    game=relationship("Game",back_populates="details")
    type = Column(SqlEnum(GameType))
    downloads = Column(Integer)
    is_conduct_tournament=Column(Boolean,default=False)
    ratings=Column(Float,nullable=True)
    category = Column(String(100))
    popularity=Column(SqlEnum(Popularity),default=Popularity.Medium)
    available_on=Column(JSON,nullable=True)