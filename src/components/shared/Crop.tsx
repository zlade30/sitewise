'use client';

import { CropIcon } from '@/public/icons';
import Image from 'next/image';
import { MouseEvent, WheelEvent, useEffect, useRef, useState } from 'react';

const Crop = ({ width, height, photo }: CropProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cropRef = useRef<HTMLDivElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    const [position, setPosition] = useState('');
    const [isSelecting, setIsSelecting] = useState(false);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const handleZoom = (event: WheelEvent<HTMLDivElement>) => {
        const zoomFactor = 0.1;
        const newScale = scale + (event.deltaY > 0 ? -zoomFactor : zoomFactor);

        if (newScale >= 1) {
            setScale(newScale);
        }
    };

    const handlePan = (event: MouseEvent<HTMLDivElement>) => {};

    const handleMouseDown = (pos: string) => {
        setIsSelecting(true);
        setPosition(pos);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const parent = containerRef.current?.getBoundingClientRect();
        if (isSelecting) {
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
        if (e.buttons === 1) {
            const panStartX = e.clientX - e.nativeEvent.offsetX;
            const panStartY = e.clientY - e.nativeEvent.offsetY;
            const panEndX = e.clientX - e.nativeEvent.offsetX;
            const panEndY = e.clientY - e.nativeEvent.offsetY;
            setTranslate({ x: Math.min(panStartX, panEndX), y: Math.min(panStartY, panEndY) });
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        setEndX(width);
        setEndY(height);
    }, [width, height]);

    return (
        <div className="overflow-hidden" onWheel={handleZoom} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            <div ref={containerRef} style={{ width, height }} className="relative">
                <Image
                    src={photo || ''}
                    fill
                    className="relative bg-black pointer-events-none"
                    objectFit="contain"
                    alt="selected_photo"
                    style={{ transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)` }}
                />
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <svg width={width} height={height}>
                        <mask id="holeMask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <rect
                                x={Math.min(startX, endX)}
                                y={Math.min(startY, endY)}
                                width={Math.abs(endX - startX)}
                                height={Math.abs(endY - startY)}
                                fill="black"
                            />
                        </mask>
                        <rect x="0" y="0" width={width} height={height} fill="#00000060" mask="url(#holeMask)" />
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
                >
                    <div className="w-full h-full relative">
                        <CropIcon
                            onMouseDown={() => handleMouseDown('tl')}
                            className="text-primary h-[30px] w-[30px] absolute left-0 top-0 cursor-nw-resize ml-[-3px] mt-[-3px]"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('tr')}
                            className="text-primary h-[30px] w-[30px] absolute right-0 top-0 cursor-ne-resize mr-[-3px] mt-[-3px] rotate-90"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('bl')}
                            className="text-primary h-[30px] w-[30px] absolute left-0 bottom-0 cursor-sw-resize ml-[-3px] mb-[-3px] -rotate-90"
                        />
                        <CropIcon
                            onMouseDown={() => handleMouseDown('br')}
                            className="text-primary h-[30px] w-[30px] absolute right-0 bottom-0 cursor-se-resize mr-[-3px] mb-[-3px] rotate-180"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crop;
