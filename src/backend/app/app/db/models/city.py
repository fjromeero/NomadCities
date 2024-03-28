from sqlalchemy import Integer, String, Column, Float
from app.db.engine import Base

class City(Base):
    __tablename__ = "city"

    id = Column(Integer ,primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    country = Column(String, nullable=False, index= True)
    continent = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)
    avg_rating = Column(Float, nullable=False, default=0)
    avg_price_per_month = Column(Float, nullable=False, default=0)
    avg_internet_connection = Column(Float, nullable=False, default=0)
    avg_coworking_spaces = Column(Float, nullable=False, default=0)
    avg_health_service = Column(Float, nullable=False, default=0)
    avg_safety = Column(Float, nullable=False, default=0)
    avg_gastronomy = Column(Float, nullable=False, default=0)
    avg_means_of_trasnsport = Column(Float, nullable=False, default=0)
    avg_foreign_friendly = Column(Float, nullable=False, default=0)