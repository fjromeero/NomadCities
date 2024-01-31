from typing import Any, Dict, Optional, Union, List
from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn, validator
import secrets

class Settings(BaseSettings):
    # Get the .env vars for the database credentials
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Create a empty uri
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    # Create the uri to connect to the database
    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def join_db_credentials(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
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
    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWD: str

    # JWT token time expiration
    # minutes * hours * days
    ACCESS_TOKEN_EXPIRATION_MINUTES = 60 * 24 * 7

    # SECRET KEY FOR JWT. You can also get one by running on a shell:
    # openssl rand -hex 32
    SECRET_KEY = secrets.token_urlsafe(32)

settings = Settings()