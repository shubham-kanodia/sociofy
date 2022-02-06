import { getToken } from './users';

async function getUserFollowing(address) {
    const response = await fetch(`http://127.0.0.1:8000/info/following?public_address=${address}`);
    
    const followingDetails = await response.json();
    return followingDetails;
}

async function getUserFollowers(address) {
    const response = await fetch(`http://127.0.0.1:8000/info/followers?public_address=${address}`);

    const followersDetails = await response.json();
    return followersDetails;
}

async function followUser(addressToFollow) {
    const token = getToken();
    
    const data = {following: addressToFollow};
    await fetch(
        "http://127.0.0.1:8000/update/following", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
}

export { getUserFollowers, getUserFollowing, followUser }