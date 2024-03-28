from app.db.engine import Base
from sqlalchemy import Column, ForeignKey, Integer, String

class CityImage(Base):
    __tablename__ = "city_image"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_city = Column(Integer, ForeignKey('city.id'), primary_key=True, index=True)
    path = Column(String, nullable=False)