from pydantic import BaseModel, Field
from datetime import datetime

class BaseComment(BaseModel):
    body: str
    rating: int = Field(ge=1, le=5)


class CommentOnCreate(BaseComment):
    id_city: int
    price_per_month: float
    internet_connection: int = Field(ge=1, le=5)
    coworking_spaces: int = Field(ge=1, le=5)
    health_service: int = Field(ge=1, le=5)
    safety: int = Field(ge=1, le=5)
    gastronomy: int = Field(ge=1, le=5)
    means_of_trasnsport: int = Field(ge=1, le=5)
    foreign_friendly: int = Field(ge=1, le=5)
    stay_length: int


class CommentOut(BaseComment):
    id: int
    username: str
    date: datetime
    stay_length: int
    