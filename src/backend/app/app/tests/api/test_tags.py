from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict

from app.crud.tag import search_user_tag_by_name, search_city_tag_by_name
from app.tests.utils.utils import random_string

name_tag = random_string(k=10)


def test_create_user_tag(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('usertag', headers=superuser_token_headers, json={
        "name": name_tag,
    })

    assert r.status_code == 200
    tag = r.json()
    assert search_user_tag_by_name(session=db, tag_name=tag["name"])


def test_create_existing_tag(client: TestClient, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('usertag', headers=superuser_token_headers, json={
        "name": name_tag,
    })

    assert r.status_code == 400
    response = r.json()
    assert response["detail"]=="There is a user tag with this name alredy"


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
    assert name_tag in response[0]['name']


def test_add_assigned_tag_to_user(client: TestClient, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.patch('usertag/me/add', headers=regular_user_token_headers, json={
        "tags": [
            {
                "name": name_tag
            }
        ]
    })

    assert r.status_code==200
    response = r.json()
    assert response == []


def test_get_user_tags(client: TestClient, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.get('usertag/me', headers=regular_user_token_headers)

    assert r.status_code == 200
    response = r.json()
    assert name_tag in response['tags'][0]['name']


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
    assert name_tag in response[0]['name']


def test_remove_not_assigned_tag(client: TestClient, db: Session, regular_user_token_headers: Dict[str, str]) -> None:
    r = client.patch('usertag/me/remove', headers=regular_user_token_headers, json={
        "tags": [
            {
                "name": name_tag
            }
        ]
    })

    assert r.status_code==200
    response = r.json()
    assert response == []


def test_get_all_tags(client: TestClient) -> None:
    r = client.get('/usertag')
    assert r.status_code == 200


def test_create_city_tag(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('citytag', headers=superuser_token_headers, json={
        "name": name_tag,
    })

    assert r.status_code == 200
    response = r.json()
    assert response['name'] == name_tag


def test_create_existing_city_tag(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    r = client.post('citytag', headers=superuser_token_headers, json={
        "name": name_tag
    })

    assert r.status_code == 400
    response = r.json()
    assert response["detail"]=="There is a city tag with this name alredy"


def test_get_all_city_tags(client: TestClient, db: Session) -> None:
    r = client.get('citytag')
    
    assert r.status_code == 200
    response = r.json()
    assert name_tag in response[-1]['name']
