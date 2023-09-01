'use client';

import { CropIcon } from '@/public/icons';
import { usePhotos } from '@/swrApi/photos';
import { ORIENTATION, PHOTO_DETAILS_PAGE_SLUG } from '@/utils/constants';
import { getImageDimensions } from '@/utils/helpers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const PhotosDetails = () => {
    const { slug = [] } = useParams();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cropRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(450);
    const [endY, setEndY] = useState(600);
    const [position, setPosition] = useState('');
    const [isSelecting, setIsSelecting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [orientation, setOrientation] = useState(ORIENTATION.portrait);
    const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    const { photos = [] } = usePhotos();
    const photoId = slug[PHOTO_DETAILS_PAGE_SLUG];
    const photoDetails = photos.find((item) => item.id === photoId);

    const handleMouseDown = (pos: string) => {
        setIsSelecting(true);
        setPosition(pos);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isSelecting) {
            const parent = containerRef.current?.getBoundingClientRect();

            const newStartX = e.clientX - parent?.left!;
            const newStartY = e.clientY - parent?.top!;
            const newEndX = e.clientX - parent?.left!;
            const newEndY = e.clientY - parent?.top!;

            if (position === 'tl' && newStartX >= 0 && newStartY >= 0 && newStartX <= parent?.width! && newStartY <= parent?.height!) {
                setStartX(newStartX);
                setStartY(newStartY);
            } else if (position === 'br' && newEndX >= 0 && newEndY >= 0 && newEndX <= parent?.width! && newEndY <= parent?.height!) {
                setEndX(newEndX);
                setEndY(newEndY);
            } else if (position === 'tr' && newStartY >= 0 && newEndX >= 0 && newStartY <= parent?.height! && newEndX <= parent?.width!) {
                setStartY(newStartY);
                setEndX(newEndX);
            } else if (position === 'bl' && newStartX >= 0 && newEndY >= 0 && newStartX <= parent?.width! && newEndY <= parent?.height!) {
                setStartX(newStartX);
                setEndY(newEndY);
            }
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    const getImageDetails = async () => {
        const result = await getImageDimensions(photoDetails?.link);
        if (result.width > result.height) {
            setOrientation(ORIENTATION.landscape);
            setBoxSize({ width: 1080, height: 864 });
        } else {
            setOrientation(ORIENTATION.portrait);
            setBoxSize({ width: 864, height: 1080 });
        }
    };

    useEffect(() => {
        getImageDetails();
    }, []);

    return (
        <div
            className="w-full h-full flex items-start justify-center overflow-y-auto"
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div ref={containerRef} style={{ width: boxSize.width, height: boxSize.height }} className="relative">
                <Image ref={imageRef} src={photoDetails?.link || ''} fill className="relative" objectFit="contain" alt="selected_photo" />
                <div className="absolute inset-0 z-[1]">
                    <svg width="450" height="600">
                        {/* Define the Mask */}
                        <mask id="holeMask">
                            {/* Create a white rectangle to cover the whole area */}
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />

                            {/* Create a black rectangle to represent the hole */}
                            <rect
                                x={Math.min(startX, endX)}
                                y={Math.min(startY, endY)}
                                width={Math.abs(endX - startX)}
                                height={Math.abs(endY - startY)}
                                fill="black"
                            />
                        </mask>

                        {/* Outer Box */}
                        <rect x="0" y="0" width="450" height="600" fill="#00000060" mask="url(#holeMask)" />
                    </svg>
                </div>
                <div
                    ref={cropRef}
                    className="absolute border-2 border-[#0B5697] select-none z-[1] inset-0"
                    style={{
                        left: Math.min(startX, endX),
                        top: Math.min(startY, endY),
                        width: Math.abs(endX - startX),
                        height: Math.abs(endY - startY)
                    }}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                >
                    <div className="w-full h-full relative">
                        <CropIcon
                            onMouseDown={() => handleMouseDown('tl')}
                            className="h-[20px] w-[20px] absolute left-0 top-0 cursor-nw-resize ml-[-3px] mt-[-3px]"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('tr')}
                            className="
                                h-[20px] w-[20px] absolute right-0 top-0 cursor-ne-resize mr-[-3px] mt-[-3px] rotate-90"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('bl')}
                            className="
                                h-[20px] w-[20px] absolute left-0 bottom-0 cursor-sw-resize ml-[-3px] mb-[-3px]
                                -rotate-90"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('br')}
                            className="
                                h-[20px] w-[20px] absolute right-0 bottom-0 cursor-se-resize mr-[-3px] mb-[-3px]
                                rotate-180"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotosDetails;
