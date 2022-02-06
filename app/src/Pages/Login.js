import React from 'react';
import MenuBar from '../components/MenuBar';

function Login(props) {
    return (
        <div className='flex flex-col h-screen'>
            <MenuBar setIsNewUser={props.setIsNewUser} setToken={props.setToken} stage="NOT_LOGGED_IN" />
            <div className='flex flex-col flex-1 items-center justify-center'>
                <div className='text-accent tracking-widest font-black text-8xl select-none'>SOCIOFY</div><br />
                <div className='text-accent tracking-wide text-2xl select-none'>Connecting Blockchain Enthusiasts</div>
            </div>
        </div>
    );
}

export default Login;