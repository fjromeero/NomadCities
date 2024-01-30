from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict

from app.db.models.user import User
from app.crud.user import search_user_by_username
from app.tests.utils.utils import random_string, random_email
from app.core.settings import settings

def test_create_user(
    client: TestClient, db: Session
) -> None:
    """
    Test creating a user through the signup endpoint.
    """
    username = random_string()
    email = random_email()
    password = random_string(10)
    data = {"username": username, "email": email, "password": password}

    r = client.post(
        url="/signup", json=data, headers={"content_type": "application/json"}
    )

    assert 200 <= r.status_code < 300

    user = search_user_by_username(session=db, username=username)

    assert user
    assert r.json() == username

def test_create_existing_username(client: TestClient) -> None:
    username = random_string()
    email = random_email()
    password = random_string()

    data_first = {"username": username, "email": email, "password": password}

    # First call
    client.post(
        url="/signup", json=data_first, headers={"content_type": "application/json"}
    )

    # Change the email so username is the only equal field
    email = random_email()
    data_second = {"username": username, "email": email, "password": password}

    # Second call
    r = client.post(
        url="/signup", json=data_second, headers={"content_type": "application/json"}
    )

    assert r.status_code == 400

def test_create_existing_email(client: TestClient) -> None:
    username = random_string()
    email = random_email()
    password = random_string()

    data_first = {"username": username, "email": email, "password": password}

    # First call
    client.post(
        url="/signup", json=data_first, headers={"content_type": "application/json"}
    )

    # Change the username so email is the only equal field
    username = random_string()
    data_second = {"username": username, "email": email, "password": password}

    # Second call
    r = client.post(
        url="/signup", json=data_second, headers={"content_type": "application/json"}
    )

    assert r.status_code == 400

def test_succesful_login(client: TestClient) -> None:
    # We use the superuser credentials that are automatically created at application startup
    login_data = {
        "username": settings.FIRST_SUPERUSER,
        "password": settings.FIRST_SUPERUSER_PASSWD,
    }

    r = client.post("/login", data=login_data)
    assert r.status_code == 200
    token = r.json()
    assert "access_token" in token

def test_unsuccesful_login(client: TestClient) -> None:
    # We use the superuser credentials that are automatically created at application startup
    login_data = {
        "username": "xxxxxxxxxxxxxxxxxxxxxxxxx",
        "password": "xxxxxxxxxxxxxxxxxxxxxxxxx",
    }

    r = client.post("/login", data=login_data)
    assert r.status_code == 401

def test_get_current_user(client: TestClient,  regular_user_token_headers: Dict[str, str]) -> None:
    r = client.get("/me", headers=regular_user_token_headers)
    current_user = r.json()
    assert current_user
    assert current_user["username"]=="testuser"
    assert current_user["email"]=="testuser@email.com"