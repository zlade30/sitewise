import useSWR from 'swr';
import { photosApi } from '.';

const usePhotos = () => {
    const { data = [], ...rest } = useSWR('', photosApi.getPhotos);

    return {
        photos: data as Photos[],
        ...rest
    };
};

export default usePhotos;

