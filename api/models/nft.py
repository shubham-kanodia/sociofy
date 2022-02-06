from typing import Optional
from pydantic import BaseModel


class NFT(BaseModel):
    token_id: int
    name: Optional[str]
    image_preview_url: Optional[str]
    image_original_url: Optional[str]
    symbol: str
    contract_address: str
    added_at: Optional[int]
