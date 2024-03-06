from pydantic import BaseModel
from typing import List

class Tag(BaseModel):
    name: str 

class Tags(BaseModel):
    tags: List[Tag]