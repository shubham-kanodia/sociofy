import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';

const MenuBar = (props) => {
    const linkToHome = (
        <Link to="/home" >
                <div 
                className='text-primarydark text-lg p-3 select-none cursor-pointer tracking-wide hover:text-primary'>
                    Home
                </div>
        </Link>
    );

    const linkToCollection = (
        <Link to="/collection">
                <div className=' text-primarydark text-lg p-3 select-none cursor-pointer tracking-wide hover:text-primary'>My Collection</div>
        </Link>
    );

    const linkToProfile = (
        <Link to="/profile">
                <div className='text-primarydark text-lg p-3 select-none cursor-pointer tracking-wide hover:text-primary'>Profile</div>
        </Link>
    );

    const linkToFind = (
        <Link to="/find">
                <div className='text-primarydark text-lg p-3 select-none cursor-pointer tracking-wide hover:text-primary'>Find</div>
        </Link>
    );

    const loginButton = <LoginButton
    setIsNewUser={props.setIsNewUser}
    setToken={props.setToken} />

    let componentsToDisplay;

    if (props.stage === "NOT_LOGGED_IN") {
        componentsToDisplay = <div className='flex bg-accent justify-end p-1'>
        {loginButton}
        </div>
    }
    else {
        componentsToDisplay = <div className='flex bg-accent justify-around p-1'>
            {linkToHome}
            {linkToCollection}
            {linkToProfile}
            {linkToFind}
        </div>
    }

    return (
        componentsToDisplay
    );
};

export default MenuBar;