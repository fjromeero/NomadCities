from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from app.core.settings import settings

# Get the uri from the settings file and create the engine
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)

db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
                       
Base = declarative_base()