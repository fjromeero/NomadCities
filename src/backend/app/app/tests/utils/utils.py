import random
import string

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict
from app.models.user import UserOnCreate
from app.crud.user import create_user, search_user_by_username

def random_string(k: int = 32) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=k))

def random_email() -> str:
    return f"{random_string(20)}@{random_string(5)}.com"

def user_auth_headers(*, client: TestClient, username: str, password: str) -> Dict[str, str]:
    data = {"username": username, "password": password}
    r = client.post("/login", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers

def regular_user_token_auth(*, client: TestClient, db: Session) -> Dict[str, str]:
    """
    Return a valid token for the user with given email.

    If the user doesn't exist it is created first.
    """
    username = "testuser"
    password = "passwd"
    user = search_user_by_username(session=db, username=username)

    if not user:
        user = UserOnCreate(
            username=username,
            password=password,
            email="testuser@email.com"
        )

        create_user(session=db, user_create=user)

    return user_auth_headers(client=client, username=username, password=password)