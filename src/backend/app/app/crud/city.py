from sqlalchemy.orm import Session
from typing import Any
from fastapi import HTTPException, status

from app.models.city import CityOnCreate
from app.db.models.city import City
from app.db.models.city_image import CityImage

def search_city_by_name(*, session: Session, city_name: str) -> Any:
    return session.query(City).filter(City.name==city_name).first()

def create_city(*, session: Session, new_city: CityOnCreate):
    city = search_city_by_name(session=session, city_name=new_city.name)
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