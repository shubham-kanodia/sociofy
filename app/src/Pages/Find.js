import React from 'react';
import { useState } from 'react/cjs/react.development';
import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';
import ProfileCard from '../components/ProfileCard';

const Find = () => {
    const [findAddress, setFindAddress] = useState("");

    let findAddressProfileElem;
    
    if (findAddress) {
        findAddressProfileElem = (
            <ProfileCard follow address={findAddress} />
        );
    }
    console.log(findAddress);

    return (
        <div className='h-screen bg-primarydark'>
            <MenuBar />
            <div className='flex flex-col space-y-24 items-center justify-center'>
                <SearchBar setFindAddress={setFindAddress} />
                { findAddressProfileElem }
            </div>
        </div>
    );
};

export default Find;