'use client';

import { twMerge } from 'tailwind-merge';
import { ChevronUpdownIcon } from '@/public/icons';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import PhotosTags from './PhotosTags';
import Bubble from '@/components/shared/Bubble';
import { usePhotos } from '@/swrApi/photos';
import { useParams } from 'next/navigation';
import { PHOTO_DETAILS_PAGE_SLUG } from '@/utils/constants';

const PhotosSelectTags = ({
    label,
    required,
    className,
    ...props
}: {
    label?: string;
    className?: string;
} & InputHTMLAttributes<HTMLDivElement>) => {
    const tagRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { photos } = usePhotos();
    const { slug = [] } = useParams();
    const photoId = slug[PHOTO_DETAILS_PAGE_SLUG];
    const photoDetails = photos.find((item) => item.id === photoId);

    const handleVariant = () => {
        return 'bg-secondary px-[12px] py-[10px] rounded-[8px] gap-[12px]';
    };

    const onCloseAnywhere = () => {
        setOpen(false);
    };
    const onDisableCloseTemporarily = () => {
        document.removeEventListener('click', onCloseAnywhere);
    };
    const onActivateClose = () => {
        document.addEventListener('click', onCloseAnywhere);
    };

    useEffect(() => {
        document.addEventListener('click', onCloseAnywhere);
        return () => {
            document.removeEventListener('click', onCloseAnywhere);
        };
    }, [open]);

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center">
                    <p className="text-[16px] font-medium mb-1">{label}</p>
                    {required && <p className="text-[16px] font-medium mb-1 ml-1 text-error">*</p>}
                </div>
            )}
            <div
                ref={tagRef}
                className={twMerge(
                    `${handleVariant()} w-full cursor-pointer flex items-center justify-between whitespace-nowrap
                    text-[14px] relative`,
                    className
                )}
                onClick={() => setOpen(!open)}
                onMouseEnter={() => onDisableCloseTemporarily}
                onMouseLeave={() => onActivateClose}
                {...props}
            >
                <div className="flex flex-wrap items-center gap-[10px]">
                    {photoDetails && photoDetails.tags.map((item) => <Bubble key={item} value={item} isClosable />)}
                </div>
                <div className="w-[20px] h-[20px]">
                    <ChevronUpdownIcon className="text-[#868E96] w-[20px] h-[20px]" />
                </div>
                <div
                    style={{ marginTop: tagRef && tagRef.current?.clientHeight! + 5 }}
                    className="absolute w-full left-0 top-0 dropdown-shadow border border-[#E9ECEF]"
                >
                    <PhotosTags />
                </div>
            </div>
        </div>
    );
};

export default PhotosSelectTags;
