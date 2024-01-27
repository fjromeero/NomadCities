from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.sql import func
from app.db.engine import Base

class CitySuggested(Base):
    __tablename__ = 'city_suggested'

    id_city = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    id_suggestion = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())