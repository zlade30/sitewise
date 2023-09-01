'use client';

import { ChangeEvent, DragEvent, MouseEvent, memo, useCallback, useState } from 'react';
import { CancelIcon, CheckIcon, PhotoUploadIcon, UploadCloudIcon, WarningOutlineIcon } from '@/public/icons';
import { setShowUploadModal, setUploadMinimize, setUploading } from '@/redux/reducers/photo';
import { faker } from '@faker-js/faker';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/components/shared/buttons';
import { AnimatePresence, motion } from 'framer-motion';
import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { photosApi, usePhotos } from '@/swrApi/photos';
import { PhotosUploadMinimize } from '.';

const PhotosUploadContainer = () => {
    const dispatch = useDispatch();
    const [isFileDrag, setIsFileDrag] = useState(false);
    const [currentUpload, setCurrentUpload] = useState(0);
    const [uploadFiles, setUploadFiles] = useState<UploadInfo[]>([]);

    const { mutate } = usePhotos();
    const { showUploadModal, uploading, uploadMinimize } = useAppSelector((state) => state.photo);

    const handleProgress = useCallback(
        (id: string) => (progressEvent: AxiosProgressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            setUploadFiles((prevData) => prevData.map((info) => (info.id === id ? { ...info, percent: percentCompleted } : info)));
        },
        []
    );

    const handleCompleted = (id: string) => {
        setCurrentUpload((prevData) => prevData + 1);
        handleUploadItem(id, 'completed');
    };

    const handleUploadFile = async (uploadInfo: UploadInfo): Promise<void> => {
        const { id, file, cancelTokenSource } = uploadInfo;
        try {
            const config: AxiosRequestConfig = {
                onUploadProgress: handleProgress(id),
                cancelToken: cancelTokenSource.token
            };
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64String = event.target!.result;
                await mutate(photosApi.uploadPhoto({ url: base64String, config }), photosApi.uploadPhotoOption());
                handleCompleted(id);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            handleUploadItem(id, 'error');
        }
    };

    const handleUploadItem = useCallback((id: string, status: 'canceled' | 'error' | 'completed') => {
        if (status === 'canceled') {
            setUploadFiles((prevData) => prevData.filter((info) => info.id !== id));
        } else if (status === 'error') {
            setUploadFiles((prevData) => prevData.map((info) => (info.id === id ? { ...info, isError: true } : info)));
        } else {
            setUploadFiles((prevData) => prevData.map((info) => (info.id === id ? { ...info, completed: true } : info)));
        }
    }, []);

    const handleDragEnter = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        setIsFileDrag(true);
    };

    const handleDragLeave = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        setIsFileDrag(false);
    };

    const handleFiles = (files: FileList) => {
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
        if (imageFiles) {
            const uploadData = Array.from(imageFiles).map((file) => ({
                file,
                id: faker.string.uuid().slice(0, 12),
                cancelTokenSource: axios.CancelToken.source()
            }));
            const promises = uploadData.map((uploadInfo: UploadInfo) => handleUploadFile(uploadInfo));
            setUploadFiles((prevData) => [...prevData, ...uploadData]);
            Promise.all(promises);
        }
    };

    const handleDrop = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        dispatch(setUploading(true));
        const { files } = evt.dataTransfer;
        handleFiles(files);
        setIsFileDrag(false);
    };

    const handleSelectFiles = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files) {
            handleFiles(evt.target.files);
        }
        evt.target.files = null;
        evt.target.value = '';
    };

    const handleColor = () => {
        return isFileDrag ? 'text-primary' : 'text-[#8E8E93]';
    };

    const clearUploads = () => {
        if (totalUpload() === currentUpload || totalUploadFailed() + currentUpload === totalUpload()) {
            setUploadFiles([]);
            setCurrentUpload(0);
        }
    };

    const handleMinimize = () => {
        if (totalUpload() !== currentUpload && uploading) {
            dispatch(setUploadMinimize(true));
        } else {
            dispatch(setShowUploadModal(false));
        }
    };

    const handleUploadStatus = () => {
        if (totalUpload() === 0) {
            dispatch(setUploading(false));
        }
    };

    const handleCancelAllUploads = () => {
        uploadFiles.forEach((file) => {
            if (!file.completed && !file.isError) {
                file.cancelTokenSource.cancel();
                handleUploadItem(file.id, 'canceled');
            }
        });
    };

    const handleCancel = useCallback((info: UploadInfo) => {
        info.cancelTokenSource.cancel();
        handleUploadItem(info.id, 'canceled');
    }, []);

    const handleOverlayClose = (evt: MouseEvent<HTMLDivElement>) => {
        if (evt.target === evt.currentTarget && !uploadMinimize) {
            handleClose();
        }
    };

    const handleOverlay = () => {
        return uploadMinimize ? 'bg-transparent justify-end pointer-events-none' : 'bg-[#00000099] justify-center';
    };

    const handleClose = () => {
        clearUploads();
        handleMinimize();
        handleUploadStatus();
    };

    const totalUpload = () => {
        return uploadFiles.length;
    };

    const totalUploadFailed = () => {
        return uploadFiles.filter((file) => file.isError).length;
    };

    const UploadProgress = memo(({ info }: { info: UploadInfo }) => (
        <div>
            <div className="relative w-full flex flex-col border border-line rounded-[8px] overflow-hidden">
                <div className="grid grid-cols-2 p-[12px]">
                    <p className="text-[14px] text-gray-400 font-medium truncate">{info.file.name}</p>
                    <div className="w-full flex items-center justify-end gap-[10px]">
                        {info.isError && <p className="text-[14px]">Unable to Upload</p>}
                        {info.isError && <WarningOutlineIcon className="w-[18px] h-[18px] text-[#FFD60A]" />}
                        {info.completed && <CheckIcon className="w-[18px] h-[18px] text-primary" />}
                        {!info.completed && !info.isError && (
                            <CancelIcon onClick={() => handleCancel(info)} className="w-[18px] h-[18px] text-error cursor-pointer" />
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full flex items-center justify-between">
                    <div
                        // This can only be done using inline style
                        style={{ width: `${info.percent}%` }}
                        className={`${!info.isError && 'bg-primary'} h-[2px] rounded-[8px]`}
                    />
                </div>
            </div>
            {info.isError && <p className="text-[14px]">Something went wrong.</p>}
        </div>
    ));
    UploadProgress.displayName = 'UploadProgress';

    const UploadPlaceholder = () => (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragEnter}
            onDragExit={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onMouseLeave={handleDragLeave}
            className={`${handleColor()} w-[500px] flex flex-col items-center justify-center gap-[20px] p-[64px]`}
        >
            <PhotoUploadIcon className="w-[80px] h-[80px]" />
            <p className="text-[14px] select-none relative cursor-pointer">Drop or photos to add to library.</p>
        </div>
    );

    const DragDropContainer = () => (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragEnter}
            onDragExit={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onMouseLeave={handleDragLeave}
            className={`
                ${handleColor()} w-full bg-[#FAFAFA] flex flex-col items-center justify-center gap-[10px] p-[24px]
                rounded-[8px]
            `}
        >
            <UploadCloudIcon className="w-[50px] h-[50px]" />
            <p className="font-medium text-[16px]">Drag and drop photos here.</p>
            <p className="text-[14px] font-light">Files Supported: JPG, PNG</p>
            <label>
                <input multiple type="file" className="hidden" accept=".png, .jpg, .jpeg" onChange={handleSelectFiles} />
                <span className="text-primary hover:underline text-[14px] font-medium cursor-pointer">Browse Files</span>
            </label>
        </div>
    );

    return (
        <AnimatePresence mode="popLayout" presenceAffectsLayout>
            {showUploadModal && (
                <div className={`${handleOverlay()} fixed inset-0 z-[100] flex items-center overflow-hidden`} onClick={handleOverlayClose}>
                    {!uploadMinimize ? (
                        <motion.div
                            className="bg-white p-[16px] flex flex-col justify-between gap-[20px] rounded-[14px]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {uploading ? (
                                <div className="w-[500px] flex flex-col justify-between">
                                    <DragDropContainer />
                                    {totalUpload() > 0 && (
                                        <div className="w-full flex items-center justify-between py-[20px] px-[10px]">
                                            <p className="text-[14px] font-medium">Uploading Progress</p>
                                            <p className="text-[14px]">{`Uploading ${currentUpload}/${totalUpload()}`}</p>
                                        </div>
                                    )}
                                    <div
                                        className="
                                            w-full max-h-[400px] flex flex-col gap-[10px] overflow-y-auto px-[10px]
                                        "
                                    >
                                        {uploadFiles.map((uploadInfo) => (
                                            <UploadProgress key={uploadInfo.id} info={uploadInfo} />
                                        ))}
                                    </div>
                                    <div className="w-full flex items-center justify-between pt-[20px]">
                                        {totalUpload() !== currentUpload && uploading && (
                                            <Button
                                                value="Cancel All"
                                                onClick={handleCancelAllUploads}
                                                icon={<CancelIcon className="w-[14px] h-[14px] text-error" />}
                                                className="bg-transparent text-error hover:bg-hover-secondary"
                                            />
                                        )}
                                        <div className="w-full flex items-center justify-end">
                                            <Button onClick={handleClose} value="Done" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <UploadPlaceholder />
                            )}
                        </motion.div>
                    ) : (
                        <PhotosUploadMinimize
                            totalUpload={totalUpload()}
                            currentUpload={currentUpload}
                            totalUploadFailed={totalUploadFailed()}
                        />
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};

export default PhotosUploadContainer;
