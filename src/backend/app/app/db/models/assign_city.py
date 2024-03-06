from sqlalchemy import Column, ForeignKey, String, Integer
from app.db.engine import Base

class AssignCity(Base):
    __tablename__ = 'assign_city'

    id_city = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    tag_name = Column(String, ForeignKey('city_tag.name'), primary_key=True, index=True)