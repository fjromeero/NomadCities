from pydantic import BaseModel
from typing import Union

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: Union[int, None] = None