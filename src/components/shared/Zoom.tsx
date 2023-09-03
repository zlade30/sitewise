'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { ZoomInIcon, ZoomOutIcon } from '@/public/icons';
import { ZOOM_MAX_VALUE } from '@/utils/constants';

const Zoom = (props: { handleChange: (value: number) => void }) => {
    const rangeRef = useRef<HTMLInputElement>(null);
    const [zoomValue, setZoomValue] = useState(0);

    const handleRange = (value: number) => {
        const percentage = (value / ZOOM_MAX_VALUE) * 100;
        rangeRef.current?.style.setProperty('--value', `${percentage}%`);
    };

    const handleZoom = (value: number) => {
        if (value === 0) {
            handleRange(0);
            setZoomValue(value);
            props.handleChange(1);
        } else if (value === 1) {
            setZoomValue(value);
            handleRange(1);
            props.handleChange(2);
        } else if (value >= 2 && value <= 5) {
            setZoomValue(value);
            handleRange(value);
            props.handleChange(value + 1);
        }
    };

    const handleZoomIn = () => {
        handleZoom(zoomValue + 1);
    };

    const handleZoomOut = () => {
        handleZoom(zoomValue - 1);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        handleZoom(value);
    };

    return (
        <div className="flex items-center gap-[10px]">
            <ZoomOutIcon className="w-[20px] h-[20px] text-[#8E8E93] cursor-pointer" onClick={handleZoomOut} />
            <input ref={rangeRef} type="range" min={0} max={5} value={zoomValue} onChange={handleChange} />
            <ZoomInIcon className="w-[20px] h-[20px] text-[#8E8E93] cursor-pointer" onClick={handleZoomIn} />
        </div>
    );
};

export default Zoom;
