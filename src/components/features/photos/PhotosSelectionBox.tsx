'use client';

import { useRef, useState, DragEvent, ReactNode, useEffect, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setUploadMinimize, setShowUploadModal } from '@/redux/reducers/photo';
import { usePhotos } from '@/swrApi/photos';

const PhotosSelectionBox = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const boxRef = useRef<HTMLDivElement | null>(null);
    const highlightRef = useRef<HTMLDivElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    const [didLeave, setDidLeave] = useState(true);
    const [isMultiple, setIsMultiple] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    const { photos, mutate } = usePhotos();

    const handlePrevData = (photo: Photos) => {
        if (isMultiple) return photo;
        else return { ...photo, active: false };
    };

    const handlePhotoSelection = () => {
        try {
            const photosRef = boxRef.current?.lastElementChild as HTMLDivElement;
            const absoluteRect = highlightRef.current?.getBoundingClientRect();

            const photoElements = Array.from(photosRef.children) as HTMLDivElement[];
            const selectedPhotos: Photos[] = [];

            for (const photoElement of photoElements) {
                const otherRect = photoElement.getBoundingClientRect();
                const photo = photos[parseInt(photoElement.title, 10)];
                const isOverlap =
                    absoluteRect!.right >= otherRect.left &&
                    absoluteRect!.left <= otherRect.right &&
                    absoluteRect!.bottom >= otherRect.top &&
                    absoluteRect!.top <= otherRect.bottom;
                if (isOverlap && photo) {
                    selectedPhotos.push({ ...photo, active: !photo.active });
                }
            }

            const data = isMultiple ? selectedPhotos : [selectedPhotos[0]];

            mutate((prevData: Photos[] | undefined) => {
                const newData = prevData?.map((item) => {
                    const updatedPayload = data.find((update) => update?.id === item.id);
                    return updatedPayload ? updatedPayload : handlePrevData(item);
                });
                return newData;
            }, false);
        } catch (error) {}
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsSelecting(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setEndX(e.clientX);
        setEndY(e.clientY);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isSelecting) {
            setEndX(e.clientX);
            setEndY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        handlePhotoSelection();
    };

    const onKeyDown = (evt: globalThis.KeyboardEvent) => {
        const { code } = evt;
        if (code === 'ShiftLeft' || code === 'ShiftRight') {
            setIsMultiple(true);
        } else if (code === 'ControlLeft' || code === 'ControlRight') {
            setIsMultiple(true);
        } else if (code === 'MetaLeft' || code === 'MetaRight') {
            setIsMultiple(true);
        } else if (code === 'Escape') {
            dispatch(setShowUploadModal(false));
        }
    };

    const onKeyUp = (_: globalThis.KeyboardEvent) => {
        setIsMultiple(false);
    };

    const activateEventKeys = () => {
        addEventListener('keydown', onKeyDown);
        addEventListener('keyup', onKeyUp);
    };

    const removeEventKeys = () => {
        removeEventListener('keydown', onKeyDown);
        removeEventListener('keyup', onKeyUp);
    };

    const handleDragEnter = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        if (didLeave) {
            dispatch(setShowUploadModal(true));
            dispatch(setUploadMinimize(false));
            setDidLeave(false);
        }
    };

    const handleDragLeave = (evt: DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        setDidLeave(true);
    };

    useEffect(() => {
        activateEventKeys();
        return () => {
            removeEventKeys();
        };
    }, []);

    return (
        <div
            ref={boxRef}
            className="w-full h-full overflow-y-auto z-[100]"
            onMouseUp={handleMouseUp}
            onDragOver={handleDragEnter}
            onDragExit={handleDragLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {isSelecting && (
                <div
                    ref={highlightRef}
                    className="absolute bg-[#6C98E233] border-2 border-[#0B5697] select-none z-[1] pointer-events-none"
                    style={{
                        left: Math.min(startX, endX),
                        top: Math.min(startY, endY),
                        width: Math.abs(endX - startX),
                        height: Math.abs(endY - startY)
                    }}
                />
            )}
            {children}
        </div>
    );
};

export default PhotosSelectionBox;
