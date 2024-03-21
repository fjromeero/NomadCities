from typing import Optional
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