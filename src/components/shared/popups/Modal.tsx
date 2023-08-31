'use client';

import { twMerge } from 'tailwind-merge';
import { MouseEvent, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Modal component.
 * @param {boolean} open - Whether the modal is open.
 * @param {Function} onClose - Function to close the modal.
 * @param {'left' | 'center' | 'right'} position - The position of the modal.
 * @param {React.ReactNode} children - The content to display within the modal.
 * @param {string} className - Additional CSS classes for styling the modal content.
 */
const Modal = ({
    open,
    onClose,
    children,
    className,
    position = 'right'
}: ModalProps & {
    className?: string;
    children: ReactNode;
    position: 'left' | 'center' | 'right';
}) => {
    const onExitModal = (evt: MouseEvent<HTMLDivElement>) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    };

    const renderPosition = (children: ReactNode) => {
        if (position === 'right') {
            return (
                <div
                    className="fixed inset-0 bg-[#00000099] z-[100] flex justify-end overflow-hidden"
                    onClick={onExitModal}
                >
                    <motion.div
                        key="right"
                        className={twMerge(
                            'bg-white p-[16px] flex flex-col justify-between gap-[20px] rounded-l-[14px]',
                            className
                        )}
                        initial={{ x: '100%' }}
                        animate={{ x: open ? 0 : '100%' }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </div>
            );
        } else if (position === 'center') {
            return (
                <div
                    className="fixed inset-0 bg-[#00000099] z-[100] flex items-center justify-center overflow-hidden"
                    onClick={onExitModal}
                >
                    <motion.div
                        key="center"
                        className={twMerge(
                            `bg-white p-[16px] flex flex-col justify-between gap-[20px] rounded-[14px]`,
                            className
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </div>
            );
        }
    };

    return (
        <AnimatePresence mode="popLayout" presenceAffectsLayout>
            {open && renderPosition(children)}
        </AnimatePresence>
    );
};

export default Modal;
