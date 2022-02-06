import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { getUserDetails } from '../utils/users';
import { getAddress } from '../utils/auth';
import { getUserFollowers, getUserFollowing, followUser } from '../utils/follow';
import UserImage from '../icons/user.svg';

import { useNavigate } from 'react-router-dom';

const ProfileCard = (props) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: ""
    });
    const [numOfFollowers, setNumOfFollowers] = useState(0);
    const [numOfFollowing, setNumOfFollowing] = useState(0);

    useEffect(() => {
        async function getUserDetailsInternal(){
            let details;
            let followers;
            let following;

            if (props.self) {
                const address = await getAddress();

                details = await getUserDetails(address);
                followers = await getUserFollowers(address);
                following = await getUserFollowing(address);
            }
            else {
                details = await getUserDetails(props.address);
                followers = await getUserFollowers(props.address);
                following = await getUserFollowing(props.address);
            }

            const processedDetails = {
                firstName: details.first_name,
                lastName: details.last_name
            };

            setUserDetails(processedDetails);
            setNumOfFollowers(followers.length);
            setNumOfFollowing(following.length);

        }
        getUserDetailsInternal();
    }, [])

    async function handleFollowRequest() {
        await followUser(props.address);
        navigate("/home");
    }

    let followBtn = (
        <div 
        className="flex items-center rounded-md m-3 hover:bg-primary hover:text-accent cursor-pointer justify-center bg-accent h-10 w-32"
        onClick={handleFollowRequest}>
            Follow
        </div>
    );

    return (
        <div className='flex flex-col justify-center items-center border border-accent rounded-md w-1/3 h-1/2'>
            <img src={UserImage} className='fill-accent w-28 h-28'/>
            <div className='text-accent uppercase font-semibold'>{userDetails.firstName} {userDetails.lastName}</div><br />
            <div className='text-accent font-semibold'>Followers: {numOfFollowers}</div>
            <div className='text-accent font-semibold'>Following: {numOfFollowing}</div>
            {props.follow && followBtn}
        </div>
    );
};

export default ProfileCard;