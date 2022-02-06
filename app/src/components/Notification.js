import React from 'react';

const Notification = (props) => {
    let action;
    if (props.data.type === "Buy") {
        action = 'bought';
    }
    else {
        action = 'sold';
    }

    const notificationText = `User has ${action} NFT with symbol ${props.data.nft.symbol}`
    return (
        <div className='flex text-primarydark bg-white h-20 w-3/4 rounded-md border border-accent mt-5 m-5'>
        <div>
            <img src={props.data.nft.image_preview_url} className='h-24 w-24' />
        </div>
        <div className='flex items-center'>
            {notificationText}
        </div>
        </div>
    );
};

export default Notification;

// {
//     "type": "Buy",
//     "executor": "0xeC09A77427caC13A598C9eD9420AA975bfE17CE9",
//     "nft": {
//         "token_id": 1,
//         "name": "None",
//         "image_preview_url": "https://lh3.googleusercontent.com/CeXunoxJ-x2tmR8Xt2Ngar6NDMVbCWtUI-XH1catguGaCXzWuCrKEygCk2oF4Cn3Z2kCYDAJqwaIHgZsL2rXdnNJ40oil7utUSEKzw=s250",
//         "image_original_url": "https://gateway.pinata.cloud/ipfs/QmR1L2AFNLXXZRZdkP9iXMn2T8D2H3JQwc41GmBLY28jrz/1.png",
//         "symbol": "WAR",
//         "contract_address": "0x0567474e802685f4d3ead546656f0684d4a3efa7",
//         "added_at": 1643904316
//     }
// }