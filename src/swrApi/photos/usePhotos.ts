'use client';

import useSWR from 'swr';
import { photosApi } from '.';
import { usePathname } from 'next/navigation';

const usePhotos = () => {
    const path = usePathname();

    const { data = [], ...rest } = useSWR(
        path.includes('photos') ? `/photos` : null,
        photosApi.getPhotos,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {
        photos: data as Photos[],
        ...rest
    };
};

export default usePhotos;

