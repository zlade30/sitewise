'use client';

import { Spinner } from '../progress';
import Button from '../buttons/Button';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckRoundIcon, WarningIcon } from '@/public/icons';

const ProgressDialog = ({
    open,
    onClose,
    className,
    statusRequest
}: ModalProps & {
    className?: string;
    statusRequest: StatusRequest;
}) => {
    const renderStatus = () => {
        if (statusRequest.status === 'error') {
            return (
                <div className="w-[100px] h-[100px] flex items-center justify-center">
                    <WarningIcon className="text-[#FFD60A] w-[30px] h-[30px]" />
                </div>
            );
        } else {
            return (
                <div className="w-[100px] h-[100px] flex items-center justify-center">
                    <CheckRoundIcon className="text-primary w-[30px] h-[30px]" />
                </div>
            );
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div
                    className="absolute inset-0 bg-[#00000099] z-[100] flex items-center justify-center overflow-hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={twMerge(
                            `w-[500px] bg-white flex flex-col justify-between gap-[20px]
                            rounded-[14px]`,
                            className
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-full flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center pb-[20px]">
                                {statusRequest.loading ? (
                                    <Spinner />
                                ) : (
                                    renderStatus()
                                )}
                                <p>{statusRequest.message}</p>
                            </div>
                        </div>
                        <div className="border-t border-line p-[16px]">
                            <Button
                                value="Close"
                                onClick={onClose}
                                className="w-full bg-transparent text-black hover:bg-hover-secondary"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProgressDialog;
