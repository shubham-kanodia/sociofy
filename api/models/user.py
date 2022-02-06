from typing import Optional
from pydantic import BaseModel


class UserDetailsUpdateInput(BaseModel):
    first_name: str
    last_name: str


class UserDetails(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
