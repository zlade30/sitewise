'use client';

import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { PhotoIcon } from '@/public/icons';
import { SuspenseSpinner } from '@/components/shared/progress';
import { FallbackEmpty, FallbackError } from '@/components/shared/fallbacks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PhotosSelectionBox from './PhotosSelectionBox';
import { usePhotos } from '@/swrApi/photos';

const Photos = () => {
    const router = useRouter();
    const path = usePathname();
    const photosRef = useRef<HTMLDivElement | null>(null);
    const { photos, error, isLoading } = usePhotos();

    const handleActive = (isActive: boolean | undefined) => {
        if (isActive) {
            return 'outline outline-4 outline-[#0B5697]';
        }
        return '';
    };

    const handleSelectedPhoto = (photo: Photos) => {
        router.push(`${path}/${photo.id}`);
    };

    return (
        <>
            {isLoading && <SuspenseSpinner />}
            {error && <FallbackError content="Something went wrong!" />}
            {photos?.length > 0 ? (
                <PhotosSelectionBox>
                    <div
                        ref={photosRef}
                        className="
                            flex flex-wrap items-start place-content-start gap-[10px] px-[24px] drag py-[10px]
                        "
                    >
                        {photos.map((item: Photos, key: number) => (
                            <div
                                key={item.id}
                                title={key.toString()}
                                className={twMerge(
                                    `relative w-[90px] h-[120px] flex items-center justify-center rounded-[8px]`,
                                    `${handleActive(item.active)}`
                                )}
                                onDoubleClick={() => handleSelectedPhoto(item)}
                            >
                                <Image
                                    fill
                                    priority
                                    alt="photo"
                                    sizes="100"
                                    src={item.link}
                                    className="rounded-[8px] object-cover select-none pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </PhotosSelectionBox>
            ) : (
                <FallbackEmpty icon={<PhotoIcon className="w-[50px] h-[50px]" />} content="List is currently empty." />
            )}
        </>
    );
};

export default Photos;
