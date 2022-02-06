import React from 'react';
import { signNonce, getNonce, getAddress } from '../utils/auth';

async function login(props) {
    const nonce = await getNonce();
    const signature = await signNonce(nonce);
    const address = await getAddress();

    const data = {
        public_address: address,
        signature: signature
    }

    const response = await fetch(
        "http://127.0.0.1:8000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    const tokenResult = await response.json();
    const token = tokenResult.token;
    const isNewUser = tokenResult.is_new_user;

    localStorage.setItem("token", token);
    props.setToken(token);
    props.setIsNewUser(isNewUser);

}

const LoginButton = (props) => {
    return (
        <div 
        className='flex items-center justify-center h-10 w-70 p-3 font-semibold justify-self-start cursor-pointer rounded-sm bg-orange-500 hover:bg-orange-400 select-none'
        onClick={() => login(props)}>
            Login with Metamask
        </div>
    );
};

export default LoginButton;