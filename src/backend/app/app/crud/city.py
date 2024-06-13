from sqlalchemy.orm import Session
from typing import Any
from fastapi import HTTPException, status

from app.models.city import CityOnCreate, CityOnUpdate
from app.db.models.city import City

def search_city_by_name_country(*, session: Session, city_name: str, city_country: str) -> Any:
    return session.query(City).filter(City.name==city_name, City.country == city_country).first()

def create_city(*, session: Session, new_city: CityOnCreate):
    city = search_city_by_name_country(session=session, city_name=new_city.name, city_country= new_city.country)
    if not city:
        city = City(
            name = new_city.name,
            country = new_city.country,
            continent = new_city.continent,
            description = new_city.description,
        )
        session.add(city)
        session.commit()
        session.refresh(city)
        return city
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='There is alredy a city with this name'
        )
    
def search_city_by_id(*, session: Session, city_id: int) -> Any:
    city = session.query(City).filter(City.id==city_id).first()
    if not city:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='There is not a city with this id',
        )
    else:
        return city
    
def update_city_data(*, session: Session, city_id: int, updated_data: CityOnUpdate):
    city = search_city_by_id(session=session, city_id=city_id)
    city_exists = search_city_by_name_country(session=session, city_name=updated_data.name, city_country=updated_data.country)

    if city_exists and not city.id == city_exists.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='There is alredy a city with that name-country duo',
        )

    if city:
        for key, value in updated_data.dict().items():
            setattr(city, key, value)

        session.commit()

def get_all_cities(*, session: Session) -> Any:
    return session.query(City).all()