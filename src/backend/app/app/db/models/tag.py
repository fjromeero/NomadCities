from sqlalchemy import Column, String
from app.db.engine import Base

class Tag(Base):
    __tablename__ = 'tag'

    name = Column(String, primary_key=True, index=True)