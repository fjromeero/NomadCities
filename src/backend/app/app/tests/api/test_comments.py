from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict
import random

rating = random.randint(1,5);
rating_zero = 0;
rating_above_five = 6;

def test_validation_error_on_create_comment(client: TestClient, regular_user_token_headers: Dict[str, str], test_city_id: int) -> None:
    r = client.post('/comment', headers=regular_user_token_headers, json={
        "body": "random_string",
        "rating": rating,
        "id_city": test_city_id,
        "price_per_month": 1000,
        "internet_connection": rating_zero,
        "coworking_spaces": rating_above_five,
        "health_service": rating,
        "safety": rating,
        "gastronomy": rating,
        "means_of_transport": rating,
        "foreign_friendly": rating,
        "stay_length": rating
    })

    assert r.status_code==422
    response = r.json()
    assert response['detail'][0]['loc'] == ["body", "internet_connection"]
    assert response['detail'][1]['loc'] == ["body", "coworking_spaces"]
    assert response['detail'][0]['msg'] == "ensure this value is greater than or equal to 1"
    assert response['detail'][1]['msg'] == "ensure this value is less than or equal to 5"


def test_create_comment_on_city(client: TestClient, regular_user_token_headers: Dict[str, str], test_city_id: int) -> None:
    r = client.post('/comment', headers=regular_user_token_headers, json={
        "body": "random_string",
        "rating": rating,
        "id_city": test_city_id,
        "price_per_month": rating,
        "internet_connection": rating,
        "coworking_spaces": rating,
        "health_service": rating,
        "safety": rating,
        "gastronomy": rating,
        "means_of_transport": rating,
        "foreign_friendly": rating,
        "stay_length": rating
    })

    assert r.status_code==200


def test_create_comment_before_time_period(client: TestClient, regular_user_token_headers: Dict[str, str], test_city_id: int) -> None:
    r = client.post('/comment', headers=regular_user_token_headers, json={
        "body": "random_string",
        "rating": rating,
        "id_city": test_city_id,
        "price_per_month": rating,
        "internet_connection": rating,
        "coworking_spaces": rating,
        "health_service": rating,
        "safety": rating,
        "gastronomy": rating,
        "means_of_transport": rating,
        "foreign_friendly": rating,
        "stay_length": rating
    })

    assert r.status_code==400
    response = r.json()
    assert response['detail']=='You cannot post a comment for this city at the moment.'


def test_city_comments_inspection(client: TestClient,db: Session , regular_user_token_headers: Dict[str, str], test_city_id: int) -> None:
    r = client.get(f'/comments/{test_city_id}', headers=regular_user_token_headers)

    assert r.status_code==200
    response = r.json()
    assert response[0]['username']=="testuser"


def test_get_invalid_city_comments(client: TestClient,db: Session , regular_user_token_headers: Dict[str, str], test_city_id: int) -> None:
    r = client.get(f'/comments/{test_city_id+1}', headers=regular_user_token_headers)

    assert r.status_code==404
    response = r.json()
    assert response['detail']==f"No comments found for city with id {test_city_id+1}"