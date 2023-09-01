'use client';

import { CheckIcon, ChevronIcon, WarningOutlineIcon } from '@/public/icons';
import { setUploadMinimize } from '@/redux/reducers/photo';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

const PhotosUploadMinimize = ({
    totalUpload,
    currentUpload,
    totalUploadFailed
}: {
    totalUpload: number;
    currentUpload: number;
    totalUploadFailed: number;
}) => {
    const dispatch = useDispatch();
    const progress = (currentUpload / totalUpload) * 100;

    const handleMaximize = () => {
        dispatch(setUploadMinimize(false));
    };

    return (
        <motion.div
            className="
                bg-white p-[16px] flex flex-col justify-between gap-[20px] rounded-[14px] self-end mb-[120px] mr-[40px]
                shadow-[0px_10px_10px_1px_rgba(0,0,0,0.10)] border border-line w-[400px] cursor-pointer
                pointer-events-auto
            "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleMaximize}
        >
            <div className="flex flex-col gap-[10px]">
                <div className="w-full flex items-center justify-between">
                    <div className="w-[90%] flex flex-col gap-[4px]">
                        <p className="font-medium text-[14px]">
                            {progress !== 100 ? `Uploading Picture ${currentUpload}/${totalUpload}` : 'Upload Complete'}
                        </p>
                        <div className="w-full bg-[#D7E3ED] h-[6px] rounded-[6px]">
                            <div style={{ width: `${progress}%` }} className="bg-primary h-[6px] rounded-[6px]" />
                        </div>
                    </div>
                    <div className="w-[10%] flex items-center justify-end">
                        {progress !== 100 ? (
                            <ChevronIcon className="text-primary w-[14px] h-[14px] rotate-90" />
                        ) : (
                            <CheckIcon className="text-primary w-[14px] h-[14px]" />
                        )}
                    </div>
                </div>
                {totalUploadFailed > 0 && (
                    <div className="w-full flex items-center gap-[10px]">
                        <WarningOutlineIcon className="w-[18px] h-[18px] text-[#FFD60A]" />
                        <p className="text-[14px] text-gray-500">{`${totalUploadFailed} Picture could not be uploaded.`}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PhotosUploadMinimize;
