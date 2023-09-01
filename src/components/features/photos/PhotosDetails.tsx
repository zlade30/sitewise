'use client';

import { useState } from 'react';
import { PhotoEdit } from '.';

const PhotosDetails = () => {
    const [isCrop, setIsCrop] = useState(false);

    return (
        <div className={`${isCrop ? 'items-start' : 'items-center'} w-full h-full flex justify-center`}>
            <PhotoEdit />
        </div>
    );
};

export default PhotosDetails;
