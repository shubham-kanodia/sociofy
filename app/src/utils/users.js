function getToken() {
    return localStorage.getItem("token");
}

async function getUserDetails(address) {
    const response = await fetch(`http://127.0.0.1:8000/info/user?public_address=${address}`);
    const userDetails = await response.json();
    return userDetails;
}

export { getToken, getUserDetails }