'use client';

import Lottie from 'lottie-react';
import { twMerge } from 'tailwind-merge';
import loadingImg from '@/public/icons/loading.json';

type SpinnerProps = {
    className?: string;
};

const Spinner = ({ className, ...props }: SpinnerProps) => {
    return (
        <Lottie
            autoPlay={true}
            loop={true}
            animationData={loadingImg}
            rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice'
            }}
            className={twMerge('w-[100px] h-[100px]', className)}
            {...props}
        />
    );
};

export default Spinner;
