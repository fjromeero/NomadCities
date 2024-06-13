from typing import Optional, List
from pydantic import BaseModel
from enum import Enum
from fastapi import Form

class Continents(str, Enum):
    Africa = "Africa",
    Antarctica = "Antarctica"
    Asia = "Asia"
    Europe = "Europe"
    North_America = "North America"
    Oceania = "Oceania"
    South_America = "South America"

class CityBase(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None
    continent: Optional[Continents] = None
    description: Optional[str] = None

# Properties to recieve via API on creation
class CityOnCreate(CityBase):
    name: str
    country: str
    continent: Continents
    description: str

    @classmethod
    def as_form(
        cls,
        name: str = Form(...),
        country: str = Form(...),
        continent: Continents = Form(...),
        description: str = Form(...),
    ):
        return cls(name = name, country = country, continent = continent, description = description)
    
from app.models.city_image import CityImage
class CityInspect(CityBase):
    name: str
    country: str
    user_can_rate: bool
    continent: Continents
    description: str
    avg_rating: float
    avg_price_per_month: float
    avg_internet_connection: float
    avg_coworking_spaces: float
    avg_health_service: float
    avg_safety: float
    avg_gastronomy: float
    avg_means_of_transport: float
    avg_foreign_friendly: float
    images: List[CityImage]

class CityOnUpdate(CityBase):
    name: str
    country: str
    continent: Continents
    description: str

    @classmethod
    def as_form(
        cls,
        name: str = Form(...),
        country: str = Form(...),
        continent: Continents = Form(...),
        description: str = Form(...),
    ):
        return cls(id = id,name = name, country = country, continent = continent, description = description)
    
class CityOut(BaseModel):
    id: int
    name: str
    country: str
    avg_rating: float
    avg_price_per_month: float
    image: CityImage

class Cities(BaseModel):
    cities: List[CityOut]