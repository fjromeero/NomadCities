from sqlalchemy import Boolean, Column, Integer, String
from app.db.engine import Base

# Create the user database model
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique= True, index= True, nullable= False)
    username = Column(String, unique= True, index= True, nullable= False)
    hashed_password=Column(String, nullable=False)
    is_admin = Column(Boolean, default= False)
    img = Column(String)