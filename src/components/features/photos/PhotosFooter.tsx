'use client';

import { Button } from '@/components/shared/buttons';
import { BinIcon, CancelPhotosIcon, DownloadIcon, ElectricIcon, SelectAllIcon, TagIcon } from '@/public/icons';
import { setShowUploadModal, setUploading } from '@/redux/reducers/photo';
import { photosApi, usePhotos } from '@/swrApi/photos';
import { useDispatch } from 'react-redux';

const PhotosFooter = () => {
    const dispatch = useDispatch();
    const { photos, mutate } = usePhotos();

    const handlePhotoState = (state: boolean) => {
        mutate((prevData: Photos[] | undefined) => {
            return prevData?.map((item: Photos) => ({
                ...item,
                active: state
            }));
        }, false);
    };

    const onSelectAll = () => {
        handlePhotoState(true);
    };

    const onTag = () => {};

    const onDelete = async () => {
        const selected = photos?.filter((item) => item.active);
        selected.forEach((photo: Photos) => {
            delete photo.active;
            mutate((prevData: Photos[] | undefined) => {
                return prevData?.filter((item) => item.id !== photo.id);
            }, false);
            mutate(photosApi.updatePhoto({ ...photo, type: 'deleted' }), photosApi.updatePhotoOption({ ...photo, type: 'deleted' }));
        });
    };

    const calculatedSelected = () => {
        if (photos) {
            return photos?.filter((item) => item.active).length;
        }
        return 0;
    };

    const handleUpload = async () => {
        dispatch(setShowUploadModal(true));
        dispatch(setUploading(true));
    };

    const onCancel = () => {
        handlePhotoState(false);
    };

    return (
        <div className="w-full flex items-center justify-between border-t border-t-line p-[26px]">
            <div className="flex items-center gap-[24px]">
                <Button value="Electrical Boxes" icon={<ElectricIcon />} />
            </div>
            <div className="flex items-center gap-[24px]">
                {calculatedSelected() > 0 && (
                    <>
                        <p className="text-[14px]">{`${calculatedSelected()} Selected`}</p>
                        <Button
                            value="Select All"
                            onClick={onSelectAll}
                            icon={<SelectAllIcon className="w-[18px] h-[18px]" />}
                            className="bg-transparent text-primary hover:bg-hover-secondary"
                        />
                        <Button
                            value="Cancel"
                            onClick={onCancel}
                            icon={<CancelPhotosIcon className="w-[18px] h-[18px]" />}
                            className="bg-transparent text-primary hover:bg-hover-secondary"
                        />
                        <Button
                            value="Tag"
                            onClick={onTag}
                            icon={<TagIcon className="w-[18px] h-[18px]" />}
                            className="bg-transparent text-primary hover:bg-hover-secondary"
                        />
                        <Button
                            value="Delete"
                            onClick={onDelete}
                            icon={<BinIcon className="w-[18px] h-[18px]" />}
                            className="bg-transparent text-primary hover:bg-hover-secondary"
                        />
                    </>
                )}
                <Button
                    className="bg-secondary text-primary hover:bg-hover-secondary"
                    value="Upload"
                    icon={<DownloadIcon className="rotate-180" />}
                    onClick={handleUpload}
                />
                <Button className="bg-secondary text-primary hover:bg-hover-secondary" value="Download" icon={<DownloadIcon />} />
            </div>
        </div>
    );
};

export default PhotosFooter;
