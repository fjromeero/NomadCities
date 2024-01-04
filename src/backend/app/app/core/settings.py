from typing import Any, Dict, Optional
from pydantic import BaseSettings, PostgresDsn, validator

class Settings(BaseSettings):
    # Get the .env vars for the database credentials
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    # Create a empty uri
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    # Create the uri to connect to the database
    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def join_db_credentials(self, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql+psycopg2",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )
    
    # Get the first superuser credentials
    # Get the first superuser credentials
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWD: str

settings = Settings()