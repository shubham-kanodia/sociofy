import React from 'react';
import MenuBar from '../components/MenuBar';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    return (
        <div className='h-screen bg-primarydark'>
            <MenuBar />
            <div className='flex justify-center items-center h-5/6'>
                <ProfileCard self />
            </div>
        </div>
    );
};

export default Profile;