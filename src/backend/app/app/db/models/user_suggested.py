from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.sql import func
from app.db.engine import Base

class UserSuggested(Base):
    __tablename__ = 'user_suggested'

    id_user = Column(Integer, ForeignKey('user.id'), primary_key=True, index=True)
    id_city = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())