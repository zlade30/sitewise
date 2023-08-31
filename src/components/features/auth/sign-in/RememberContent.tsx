import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FullLogoIcon } from '@/public/icons';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';
import { Button } from '@/components/shared/buttons';
import { setAuthCurrentStep } from '@/redux/reducers/app';

const RememberContent = () => {
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
            <div className="flex w-[445px] items-center">
                <p className="w-full text-center font-semibold">
                    Authentication
                </p>
            </div>
            <div
                className="
                    w-[445px] flex flex-col bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] p-[32px] gap-[16px]
                "
            >
                <FullLogoIcon className="z-1 w-[185px] h-[47px]" />
                <h1 className="text-[24px] font-semibold">Stay signed in?</h1>
                <p className="text-[14px]">
                    Stay signed in so you don’t have to sign in again next time.
                </p>
                <div className="flex items-center gap-[8px] text-[14px]">
                    <input type="checkbox" />
                    <p>Don&apos;t show this again</p>
                </div>
                <div className="self-end flex items-center gap-[16px]">
                    <Button
                        onClick={() => {
                            router.push('/projects');
                            dispatch(setAuthCurrentStep(signInSteps.LOGIN));
                        }}
                        value="Cancel"
                        className="rounded-none w-[100px] bg-[#CCCCCC] text-black hover:bg-hover-secondary"
                    />
                    <Button
                        onClick={() => {
                            router.push('/projects');
                            dispatch(setAuthCurrentStep(signInSteps.LOGIN));
                        }}
                        value="Yes"
                        className="rounded-none w-[100px]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default RememberContent;
