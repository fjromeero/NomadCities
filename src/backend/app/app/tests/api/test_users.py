from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.db.models.user import User
from app.models.user import UserOnCreate
from app.tests.utils.utils import random_string, random_email

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

    user = db.query(User).filter(User.username == username).first()

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