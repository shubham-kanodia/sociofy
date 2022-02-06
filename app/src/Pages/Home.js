import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import MenuBar from '../components/MenuBar';
import Notification from '../components/Notification';
import { getNotifications } from '../utils/notifications';

const Home = () => {
    const [notifications, setNotifications] = useState(null);
    useEffect(() => {
        async function fetchNotifications() {
            const notifications = await getNotifications();
            console.log(notifications);
            setNotifications(notifications);
        }

        fetchNotifications();
    }, [])

    let displayNotifications;

    if (notifications) {
        displayNotifications = <div className='flex flex-1 flex-col justify-center items-center bg-primarydark overflow-auto'>
            {
                notifications.map(notification => {
                    return <Notification data={notification} />
                })
            }
        </div>
    }
    
    return (
        <div className='h-screen bg-primarydark'>
            <MenuBar />
            { displayNotifications }
        </div>
    );
};

export default Home;