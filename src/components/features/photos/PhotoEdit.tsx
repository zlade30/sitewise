'use client';

import { Crop } from '@/components/shared';
import { CropIcon } from '@/public/icons';
import { usePhotos } from '@/swrApi/photos';
import { PHOTO_DETAILS_PAGE_SLUG } from '@/utils/constants';
import { getImageDimensions } from '@/utils/helpers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PhotoEdit = () => {
    const { slug = [] } = useParams();
    const [boxSize, setBoxSize] = useState<DimensionProps>({ width: 0, height: 0 });

    const { photos = [] } = usePhotos();
    const photoId = slug[PHOTO_DETAILS_PAGE_SLUG];
    const photoDetails = photos.find((item) => item.id === photoId);

    const getImageDetails = async () => {
        const result = await getImageDimensions(photoDetails?.link);
        const dimension = { width: 675, height: 540 };
        // Handle Orientation
        if (result.width > result.height) {
            setBoxSize({ width: dimension.width, height: dimension.height });
        } else {
            setBoxSize({ width: dimension.height, height: dimension.width });
        }
    };

    useEffect(() => {
        if (photoDetails) {
            getImageDetails();
        }
    }, [photoDetails]);

    return <Crop width={boxSize.width} height={boxSize.height} photo={photoDetails?.link} />;
};

export default PhotoEdit;
