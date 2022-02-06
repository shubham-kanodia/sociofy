import {getToken} from './users';

async function getNotifications() {
    const token = getToken();
    
    const response = await fetch(
        "http://127.0.0.1:8000/info/notifications", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );

    const result = await response.json();
    return result;
}

export { getNotifications }