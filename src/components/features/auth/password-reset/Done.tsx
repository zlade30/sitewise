import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FullLogoIcon } from '@/public/icons';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';
import { Button } from '@/components/shared/buttons';
import { setAuthCurrentStep } from '@/redux/reducers/app';

const Done = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { authIsBack } = useAppSelector((state) => state.app);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={{
                initial: { x: authIsBack ? '-100%' : '100%' },
                animate: { x: 0 }
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut'
            }}
            className="flex flex-col items-center gap-[20px]"
        >
            <div
                className="
                    w-[445px] flex flex-col bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] p-[32px] gap-[16px]
                "
            >
                <FullLogoIcon className="z-1 w-[185px] h-[47px]" />
                <h1 className="text-[24px] font-semibold">
                    Security info updated
                </h1>
                <p className="text-[14px]">
                    Summary of what you&apos;ve completed
                </p>
                <p className="text-[14px] font-semibold">
                    Your password was changed
                </p>
                <div className="self-end flex items-center gap-[16px]">
                    <Button
                        onClick={() => {
                            router.push('/sign-in');
                            dispatch(setAuthCurrentStep(signInSteps.LOGIN));
                        }}
                        value="Sign In"
                        className="w-[100px] rounded-none"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Done;
