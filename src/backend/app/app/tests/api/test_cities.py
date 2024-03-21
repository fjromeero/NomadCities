from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from typing import Dict

from app.tests.utils.utils import random_string

city_name = random_string(k=8)
country = "Spain"
continent = "Europe"
description = random_string(k=75)

city_data = {
    "name": city_name,
    "country": country,
    "continent": continent,
    "description": description
}

def test_city_creation(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    with open("static/images/users/default_pfp.png","rb") as image_file:
        files = {"images": ("test_city_img.png", image_file, "image/png")}
        r = client.post('city', headers=superuser_token_headers, data=city_data, files=files)

    assert r.status_code == 200
    response = r.json()
    assert response == city_name

def test_city_creation_exiting(client: TestClient, db: Session, superuser_token_headers: Dict[str, str]) -> None:
    with open("static/images/users/default_pfp.png","rb") as image_file:
        files = {"images": ("test_city_img.png", image_file, "image/png")}
        r = client.post('city', headers=superuser_token_headers, data=city_data, files=files)

    assert r.status_code == 400
    response = r.json()
    assert response['detail'] == 'There is alredy a city with this name' 