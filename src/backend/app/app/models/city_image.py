from pydantic import BaseModel
from typing import List

class CityImage(BaseModel):
    path: str