'use client';

import { PopupArrowIcon } from '@/public/icons';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Popup = ({ open, onClose, children }: PopupProps) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<{
        x: number;
        y: number;
        chevron: 'left' | 'right';
    }>({ x: 0, y: 0, chevron: 'left' });
    let initial = false;

    const onExitPopup = (evt: any) => {
        if (
            divRef.current &&
            !divRef.current.contains(evt.target as Node) &&
            initial
        ) {
            onClose();
        }
        initial = true;
    };

    useEffect(() => {
        if (open) {
            const popup = document.getElementById('popup');
            const parentDiv = popup?.parentElement;
            const child = parentDiv?.firstElementChild;

            const target = child as HTMLElement;
            const divWidth = target.offsetWidth;
            const divHeight = target.offsetHeight;
            const screenWidth = window.innerWidth;
            let chevron: 'left' | 'right' = 'left';
            let x = target.getBoundingClientRect().x + divWidth;
            let y = target.getBoundingClientRect().y + divHeight / 2;
            const popupWidth = document.getElementById('popup')?.clientWidth;

            if (x + popupWidth! > screenWidth) {
                x -= popupWidth!;
                chevron = 'right';
            } else {
                x -= divWidth!;
            }
            y += 10;
            setPosition({ x, y, chevron });
            window.addEventListener('click', onExitPopup);
        }
        return () => {
            window.removeEventListener('click', onExitPopup);
            setPosition({ x: 0, y: 0, chevron: 'left' });
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={divRef}
                    style={{ left: position.x, top: position.y }}
                    id="popup"
                    className="absolute z-[100]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ scale: 0 }}
                >
                    <div className="p-[16px] bg-white rounded-[8px] shadow-[0px_8px_64px_0px_rgba(0,0,0,0.12)]">
                        <div
                            className={`${
                                position.chevron === 'right'
                                    ? 'justify-end'
                                    : 'justify-start'
                            } flex items-center`}
                        >
                            <PopupArrowIcon className="w-[18px] h-[18px] text-white absolute mt-[-38px]" />
                        </div>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;
