from sqlalchemy import Integer, Column, ForeignKey, Text, DateTime, Boolean, Float
from sqlalchemy.sql import func
from app.db.engine import Base


class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer ,primary_key=True, index=True)
    id_city = Column(Integer, ForeignKey('city.id'), nullable=False, index=True)
    id_user = Column(Integer, ForeignKey('user.id'), nullable=False, index=True)
    body = Column(Text, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    rating = Column(Integer, default=0)
    reported = Column(Boolean, default=False, index=True)
    polarity = Column(Integer, index=True)
    price_per_month = Column(Float)
    internet_connection = Column(Integer, nullable=False)
    coworking_spaces = Column(Integer, nullable=False)
    health_service = Column(Integer, nullable=False)
    safety = Column(Integer, nullable=False)
    gastronomy = Column(Integer, nullable=False)
    means_of_trasnsport = Column(Integer, nullable=False)
    foreign_friendly = Column(Integer, nullable=False)
    stay_length = Column(Integer, nullable=False)
