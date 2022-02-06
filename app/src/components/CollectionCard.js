import React from 'react';

const CollectionCard = (props) => {
    return (
        <div className='flex flex-col justify-center items-center truncate h-72 w-60 border rounded-md border-accent hover:border-white p-3 cursor-pointer'>
            <img src={props.imageUrl} className='h-44 w-44' />
            <div className='text-accent select-none'>Token ID: {props.tokenId}</div>
            <div className='text-accent select-none'>Symbol: {props.symbol}</div>
        </div>
    );
};

export default CollectionCard;