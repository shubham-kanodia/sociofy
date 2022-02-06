from pydantic import BaseModel
from enum import Enum

from models.nft import NFT


class NotificationType(Enum):
    BUY = "Buy"
    SELL = "Sell"


class Notification(BaseModel):
    type: NotificationType
    executor: str
    nft: NFT
