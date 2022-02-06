from pydantic import BaseModel


class LoginInput(BaseModel):
    public_address: str
    signature: str

