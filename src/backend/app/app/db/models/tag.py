from sqlalchemy import Column, String, Integer, UniqueConstraint
from app.db.engine import Base

class Tag(Base):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)