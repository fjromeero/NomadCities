from typing import Generator, Dict

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.db.init_db import init_db
from app.tests.utils.db import engine
from app.tests.utils.utils import regular_user_token_auth, superuser_token_auth, test_city_data

@pytest.fixture(scope="session")
def db() -> Generator:
    with Session(engine) as session:
        init_db(session)
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

@pytest.fixture(scope="module")
def test_city_id(db: Session) -> int:
    return test_city_data(db=db)