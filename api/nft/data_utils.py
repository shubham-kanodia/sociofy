import requests
from models.nft import *


class DataUtils:
    def __init__(self, config):
        self.BASE_ASSETS_URL = "https://testnets-api.opensea.io/api/v1/assets"

    def fetch_nfts(self, public_address):
        url = f"{self.BASE_ASSETS_URL}?owner={public_address}"
        response = requests.request("GET", url).json()
        return response

    @staticmethod
    def parse_nft_data(data):
        assets = data["assets"]
        processed_data = []

        for asset in assets:
            try:
                token_id = int(asset['token_id'])
                name = asset["name"]
                image_preview_url = asset["image_preview_url"]
                image_original_url = asset["image_original_url"]
                symbol = asset["asset_contract"]["symbol"]
                contract_address = asset["asset_contract"]["address"]

                nft_data = NFT(token_id=token_id,
                               name=name,
                               image_preview_url=image_preview_url,
                               image_original_url=image_original_url,
                               symbol=symbol,
                               contract_address=contract_address)
                processed_data.append(nft_data)
            except:
                continue

        return processed_data

    def refresh_collection(self, public_address, crud_utils):
        try:
            response = self.fetch_nfts(public_address)
            nfts = self.parse_nft_data(response)

            for nft in nfts:
                # Do not send NFTs which do not have a preview image
                if not crud_utils.check_nft_exists(public_address, nft.contract_address, nft.token_id):
                    crud_utils.add_nft_data(public_address, nft)

        except Exception as exp:
            return {"Status": "Failed"}
