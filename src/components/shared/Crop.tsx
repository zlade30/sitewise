'use client';

import { Zoom } from '.';
import Image from 'next/image';
import { Button } from './buttons';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { CancelIcon, CheckIcon, CropChevronIcon, RotateIcon } from '@/public/icons';

const Crop = ({ width, height, src, handleCancel, handleSave }: CropProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cropRef = useRef<HTMLDivElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    const [isSelecting, setIsSelecting] = useState(false);
    const [scale, setScale] = useState(1);
    const [direction, setDirection] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [rotate, setRotate] = useState(0);

    const handleDirection = (pos: string) => {
        setIsSelecting(true);
        setIsDragging(false);
        setDirection(pos);
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const element = e.target as HTMLDivElement;
        if (element.tagName.toLocaleLowerCase() === 'div' && scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isSelecting) {
            const parent = containerRef.current?.getBoundingClientRect();
            const newStartX = e.clientX - parent?.left!;
            const newStartY = e.clientY - parent?.top!;
            const newEndX = e.clientX - parent?.left!;
            const newEndY = e.clientY - parent?.top!;
            if (direction === 'tl' && newStartX >= 0 && newStartY >= 0 && newStartX <= parent?.width! && newStartY <= parent?.height!) {
                setStartX(newStartX);
                setStartY(newStartY);
            } else if (direction === 'br' && newEndX >= 0 && newEndY >= 0 && newEndX <= parent?.width! && newEndY <= parent?.height!) {
                setEndX(newEndX);
                setEndY(newEndY);
            } else if (direction === 'tr' && newStartY >= 0 && newEndX >= 0 && newStartY <= parent?.height! && newEndX <= parent?.width!) {
                setStartY(newStartY);
                setEndX(newEndX);
            } else if (direction === 'bl' && newStartX >= 0 && newEndY >= 0 && newStartX <= parent?.width! && newEndY <= parent?.height!) {
                setStartX(newStartX);
                setEndY(newEndY);
            }
        }

        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPosition({ x: dx, y: dy });
        }
    };

    const handleRotation = () => {
        setRotate(rotate - 90);
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setIsDragging(false);
    };

    const handleZoomChange = (value: number) => {
        if (value === 1) {
            setPosition({ x: 0, y: 0 });
        }
        setScale(value);
    };

    useEffect(() => {
        setEndX(width);
        setEndY(height);
    }, [width, height]);

    return (
        <div className="flex flex-col">
            <div
                className="overflow-hidden select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div ref={containerRef} style={{ width, height }} className="relative bg-black">
                    <Image
                        ref={imageRef}
                        src={src || ''}
                        fill
                        className="relative bg-black pointer-events-none object-contain"
                        alt="selected_photo"
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg) translate(${position.x}px, ${position.y}px)`
                        }}
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
                            <CropChevronIcon
                                onMouseDown={() => handleDirection('tl')}
                                className="text-primary h-[30px] w-[30px] absolute left-0 top-0 cursor-nw-resize ml-[-4px] mt-[-4px]"
                            />
                            <CropChevronIcon
                                onMouseDown={() => handleDirection('tr')}
                                className="text-primary h-[30px] w-[30px] absolute right-0 top-0 cursor-ne-resize mr-[-4px] mt-[-4px] rotate-90"
                            />
                            <CropChevronIcon
                                onMouseDown={() => handleDirection('bl')}
                                className="text-primary h-[30px] w-[30px] absolute left-0 bottom-0 cursor-sw-resize ml-[-4px] mb-[-4px] -rotate-90"
                            />
                            <CropChevronIcon
                                onMouseDown={() => handleDirection('br')}
                                className="text-primary h-[30px] w-[30px] absolute right-0 bottom-0 cursor-se-resize mr-[-4px] mb-[-4px] rotate-180"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-between py-[20px]">
                <Zoom handleChange={handleZoomChange} />
                <div className="flex items-center gap-[10px]">
                    <Button
                        onClick={handleCancel}
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                        icon={<CancelIcon className="w-[14px] h-[14px]" />}
                        value="Cancel"
                    />
                    <Button
                        onClick={handleRotation}
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                        icon={<RotateIcon className="w-[18px] h-[18px]" />}
                        value="Rotate"
                    />
                    <Button
                        onClick={handleSave}
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                        icon={<CheckIcon className="w-[14px] h-[14px]" />}
                        value="Save"
                    />
                </div>
            </div>
        </div>
    );
};

export default Crop;
