import axios, { AxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

const endpoint = '/photos';

const getPhotos = async (query: string) => {
    const response = await api.get(query);
    return response.data;
};

const uploadPhoto = async ({
    url, config
} : {
    url: string | ArrayBuffer | null;
    config: AxiosRequestConfig
}) => {
    const response = await api.post(endpoint, {
        tags: [],
        link: url,
        tagCustom: '',
        customTags: [],
        basicTags: [
            'Date and Time',
            'Needs Review',
            'Showcase Photo',
            'Uploaded Photos'
        ],
        date: new Date().getTime(),
        notes: faker.lorem.sentence(),
        id: faker.string.uuid().slice(0, 12),
        fileName: `${faker.lorem.word(10)}.png`,
        photoId: faker.string.uuid().slice(0, 12),
        markAs: faker.helpers.arrayElement([true, false]),
        isNeedReview: faker.helpers.arrayElement([true, false]),
        suite: faker.helpers.arrayElement(['interior', 'exterior']),
        status: faker.helpers.arrayElement(['showcase', 'uploaded']),
        type: faker.helpers.arrayElement(['electric-boxes', 'deleted']),
        location: `${faker.location.state()} ${faker.location.streetAddress()} ${faker.location.zipCode()}`
    }, config);
    return response.data;
};

const uploadPhotoOption = () => {
    return {
        rollbackOnError: true,
        populateCache: (updatedPayload: Photos, photos: Photos[]) => {
            return [...photos, updatedPayload];
        },
        revalidate: false
    };
};

const updatePhoto = async (payload: Photos) => {
    const response = await api.put(
        `${endpoint}/${payload.id}`,
        payload
    );
    return response.data;
};

const updatePhotoOption = (payload: Photos) => {
    return {
        optimisticData: (photos: Photos[]) => {
            return photos.filter((item) => item.id !== payload.id);
        },
        rollbackOnError: true,
        populateCache: (updatedPayload: Photos, photos: Photos[]) => {
            return photos.filter((item) => item.id !== updatedPayload.id);
        },
        revalidate: false
    };
};

const deletePhoto = async ({ id }: { id: string }) => {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
};

const photosApi = {
    deletePhoto,
    getPhotos,
    updatePhoto,
    updatePhotoOption,
    uploadPhoto,
    uploadPhotoOption
}

export default photosApi;