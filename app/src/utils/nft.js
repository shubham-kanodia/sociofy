import { getToken } from './users';

async function getUserNFTData() {
    const token = getToken();
    const response = await fetch(
        "http://127.0.0.1:8000/info/collection", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const nft_data = await response.json();
    return nft_data;
}

export { getUserNFTData }