import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { FullLogoIcon } from '@/public/icons';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';
import { Button } from '@/components/shared/buttons';
import { setAuthCurrentStep, setAuthIsBack } from '@/redux/reducers/app';

const LoginContent = () => {
    const dispatch = useDispatch();
    const { authIsBack } = useAppSelector((state) => state.app);

    const onSubmit = () => {
        dispatch(setAuthIsBack(false));
        dispatch(setAuthCurrentStep(signInSteps.EMAIL));
    };

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
            className="flex flex-col items-center justify-between h-[50%]"
        >
            <FullLogoIcon className="z-1 w-[445px] h-[116px]" />
            <Button
                className="rounded-[0px] w-[445px]"
                onClick={onSubmit}
                value="Login"
            />
        </motion.div>
    );
};

export default LoginContent;
