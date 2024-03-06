from typing import Generator, Dict

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.main import app
from app.db.engine import engine
from app.tests.utils.utils import regular_user_token_auth, superuser_token_auth

@pytest.fixture(scope="session")
def db() -> Generator:
    with Session(engine) as session:
        yield session

@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope="function")
def regular_user_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
    return regular_user_token_auth(client=client, db=db)

@pytest.fixture(scope="function")
def superuser_token_headers(client: TestClient) -> Dict[str, str]:
    return superuser_token_auth(client=client)