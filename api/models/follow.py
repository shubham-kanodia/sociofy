from pydantic import BaseModel


class FollowRequest(BaseModel):
    follower: str
    following: str


class InputFollowRequest(BaseModel):
    following: str
