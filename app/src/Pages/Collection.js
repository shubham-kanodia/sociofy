import React, { useEffect, useState } from 'react';
import MenuBar from '../components/MenuBar';
import CollectionCard from '../components/CollectionCard';

import { getUserNFTData } from '../utils/nft';

const Collection = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await getUserNFTData();
            console.log(response);
            setData(response);
        }
        fetchData();
    }, []);

    const collection = data.map( elem => {
       return <CollectionCard 
       imageUrl={elem.image_preview_url} 
       symbol={elem.symbol}
       tokenId={elem.token_id}
        />
    });

    return (
        <div className='h-screen bg-primarydark'>
            <MenuBar />
            <div className='grid grid-cols-5 gap-4 mt-10 p-10'>
                { collection }
            </div>
        </div>
    );
};

export default Collection;