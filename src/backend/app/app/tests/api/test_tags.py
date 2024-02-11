from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict

from app.crud.tag import search_tag, create_user_tag, user_has_tag
from app.tests.utils.utils import random_string
from app.models.tag import Tag

name_tag = random_string(k=10)

def test_create_user_tag(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('usertag', headers=superuser_token_headers, json={
        "name": name_tag,
    })

    assert r.status_code == 200
    tag = r.json()
    assert search_tag(session=db, name=tag["name"])

def test_create_existing_tag(client: TestClient, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('usertag', headers=superuser_token_headers, json={
        "name": name_tag,
    })

    assert r.status_code == 400
    response = r.json()
    assert response["detail"]=="There is alredy a tag with this name"

def test_create_tag_regular_user(client: TestClient, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.post('usertag', headers=regular_user_token_headers, json={
        "name":name_tag,
    })
    assert r.status_code == 400
    response = r.json()
    assert response["detail"]=='User must be a superuser'

def test_add_new_tags_to_user(client: TestClient, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.patch('usertag/me/add', headers=regular_user_token_headers, json={
        "tags": [
            {
                "name": name_tag
            }
        ]
    })

    assert r.status_code==200
    response = r.json()
    assert name_tag in response

def test_remove_tag_from_user(client: TestClient, db: Session, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.patch('usertag/me/remove', headers=regular_user_token_headers, json={
        "tags": [
            {
                "name": name_tag
            }
        ]
    })

    assert r.status_code==200
    response = r.json()
    assert name_tag in response