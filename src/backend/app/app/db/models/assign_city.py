from sqlalchemy import Column, ForeignKey, Integer
from app.db.engine import Base

class AssignCity(Base):
    __tablename__ = 'assign_city'

    id_city = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    id_city_tag = Column(Integer, ForeignKey('city_tag.id'), primary_key=True, index=True)
    count = Column(Integer, default=1)