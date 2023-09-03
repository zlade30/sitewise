'use client';

import { Crop, Zoom } from '@/components/shared';
import { MouseEvent, useEffect, useState } from 'react';
import { usePhotos } from '@/swrApi/photos';
import { useParams } from 'next/navigation';
import { getImageDimensions } from '@/utils/helpers';
import { PHOTO_DETAILS_PAGE_SLUG } from '@/utils/constants';
import Image from 'next/image';
import { Button, ButtonRounded } from '@/components/shared/buttons';
import { CalendarIcon, ChevronIcon, CropIcon, ExteriorIcon, InteriorIcon, PhotoIcon, PinIcon } from '@/public/icons';
import { Select } from '@/components/shared/selects';
import { PhotosSelectTags } from '.';

const PhotosDetails = () => {
    const [isCrop, setIsCrop] = useState(false);
    const { slug = [] } = useParams();
    const [boxSize, setBoxSize] = useState<DimensionProps>({ width: 0, height: 0 });
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [suites, setSuites] = useState<OptionsValue[]>([
        {
            label: 'Main Interior',
            value: 'main-interior',
            icon: <InteriorIcon className="w-[18px] h-[18px]" />
        },
        {
            label: 'Main Exterior',
            value: 'main-exterior',
            icon: <ExteriorIcon className="w-[18px] h-[18px]" />
        }
    ]);
    const [selectedSuites, setSelectedSuites] = useState<OptionsValue>({
        label: '',
        value: '',
        icon: undefined,
        payload: undefined
    });
    const [showTagsPopup, setShowTagsPopup] = useState(false);

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

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (element.tagName.toLocaleLowerCase() === 'div' && scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPosition({ x: dx, y: dy });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoomChange = (value: number) => {
        if (value === 1) {
            setPosition({ x: 0, y: 0 });
        }
        setScale(value);
    };

    const handleCrop = () => {
        setIsCrop(true);
    };

    const handleCancel = () => {
        setIsCrop(false);
    };

    const handleSave = () => {
        console.log('save');
    };

    const handlePhotoTagsClose = () => {
        setShowTagsPopup(false);
    };

    useEffect(() => {
        if (photoDetails) {
            getImageDetails();
        }
    }, [photoDetails]);

    return (
        <div className={`${isCrop ? 'items-center' : 'items-start'} w-full h-full flex justify-center`}>
            {isCrop ? (
                <Crop
                    width={boxSize.width}
                    height={boxSize.height}
                    src={photoDetails?.link}
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-start">
                    {photoDetails && (
                        <div className="w-full flex flex-col items-center">
                            <section
                                className="relative overflow-hidden bg-black rounded-[8px]"
                                style={{ width: boxSize.width, height: boxSize.height }}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                <Image
                                    alt="photo"
                                    src={photoDetails.link}
                                    fill
                                    className="rounded-[8px] object-contain select-none pointer-events-none"
                                    style={{
                                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`
                                    }}
                                />
                            </section>
                            <section className="flex items-center justify-center gap-[40px] py-[20px]">
                                <Zoom handleChange={handleZoomChange} />
                                <div className="flex items-center gap-[10px]">
                                    <ButtonRounded icon={<ChevronIcon />} />
                                    <ButtonRounded icon={<ChevronIcon className="rotate-180" />} />
                                </div>
                                <Button
                                    className="bg-transparent hover:bg-hover-secondary text-primary"
                                    icon={<CropIcon className="w-[18px] h-[18px]" />}
                                    value="Crop"
                                    onClick={handleCrop}
                                />
                            </section>
                            <section className="w-full grid grid-cols-4 text-[14px] font-semibold">
                                <div className="flex flex-col gap-[12px] px-[26px]">
                                    <p>Time</p>
                                    <div className="flex items-center gap-[12px]">
                                        <div className="w-[18px]">
                                            <CalendarIcon className="w-[18px] h-[18px]" />
                                        </div>
                                        <p className="font-medium text-[18px]">{photoDetails.date}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] px-[26px]">
                                    <p>Location</p>
                                    <div className="flex items-start gap-[12px]">
                                        <div className="w-[18px] mt-1">
                                            <PinIcon className="w-[18px] h-[18px]" />
                                        </div>
                                        <p className="font-medium text-[18px]">{photoDetails.location}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] px-[26px]">
                                    <p>File Name</p>
                                    <div className="flex items-center gap-[12px]">
                                        <div className="w-[18px]">
                                            <PhotoIcon className="w-[18px] h-[18px]" />
                                        </div>
                                        <p className="font-medium text-[18px]">{photoDetails.fileName}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] px-[26px]">
                                    <p>Suite</p>
                                    <div className="flex items-center gap-[12px]">
                                        <Select
                                            valueHasIcon
                                            variant="primary"
                                            options={suites}
                                            isIconPrimary={false}
                                            isDropDownIconRight={false}
                                            optionValue={selectedSuites}
                                            className="bg-transparent border border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[12px] px-[26px]">
                                    <p>Tags</p>
                                    <div className="flex items-center gap-[12px]">
                                        <PhotosSelectTags className="bg-transparent border border-primary" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PhotosDetails;
