import React from 'react';
import { useState } from 'react/cjs/react.development';

import { getToken } from '../utils/users';

const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    async function updateDetails(props) {
        const token = getToken();
        const data = {first_name: firstName, last_name: lastName}

        console.log(JSON.stringify(data));
        await fetch(
            "http://127.0.0.1:8000/update/details", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        props.setIsNewUser(false);
    }
    return (
        <div className='flex justify-center items-center h-screen bg-gray-300'>
                <div className='flex flex-col justify-center items-center border rounded-md border-orange-600 w-1/3 h-1/3 p-4'>
                    <div className=' text-orange-700 font-semibold'>First Name <input className=' bg-orange-300 rounded-md p-2 ml-5' value={firstName} onChange={(evt) => setFirstName(evt.target.value)}/></div>
                    <div className='mt-10 text-orange-700 font-semibold'>Last Name <input className='bg-orange-300 rounded-md p-2 ml-5' value={lastName} onChange={(evt) => setLastName(evt.target.value)} /></div>

                    <div className='mt-10 text-orange-700 font-semibold cursor-pointer'
                    onClick={() => updateDetails(props)}
                    >Submit</div>
                </div>
        </div>
    );
};

export default Signup;