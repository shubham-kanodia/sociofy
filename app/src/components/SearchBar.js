import React from 'react';
import { useState } from 'react/cjs/react.development';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='flex justify-center items-center mt-10'>
            <input
            type="text"
            className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
            placeholder="Search user to follow..."
            value={searchValue}
            onChange={(evt) => setSearchValue(evt.target.value)}>

            </input>
            <div className='flex items-center justify-center bg-accent rounded-lg w-10 h-14 ml-2 cursor-pointer'
            onClick={() => props.setFindAddress(searchValue)}>Go</div>
        </div>
    );
};

export default SearchBar;