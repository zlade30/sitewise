import {
    ChevronIcon,
    FullLogoIcon,
    KeyIcon,
    QuestionRoundedIcon
} from '@/public/icons';
import * as yup from 'yup';
import Link from 'next/link';
import {
    setAuthCurrentStep,
    setAuthIsBack,
    setSignInForm
} from '@/redux/reducers/app';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';
import { Button } from '@/components/shared/buttons';
import { InputForm } from '@/components/shared/textfields';

const EmailContent = () => {
    const dispatch = useDispatch();
    const { authIsBack } = useAppSelector((state) => state.app);
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email')
            .required('* this is a required field')
    });

    const onBack = () => {
        dispatch(setAuthIsBack(true));
        dispatch(setAuthCurrentStep(signInSteps.LOGIN));
    };

    const onSubmit = ({ email }: { email: string }) => {
        dispatch(setSignInForm({ email, password: '' }));
        dispatch(setAuthCurrentStep(signInSteps.PASSWORD));
    };

    const formik: any = useFormik({
        initialValues: { email: '' },
        validationSchema: schema,
        onSubmit
    });

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
                <ChevronIcon className="cursor-pointer" onClick={onBack} />
                <p className="w-full text-center font-semibold">
                    Authentication
                </p>
            </div>
            <form
                className="
                    w-[445px] flex flex-col bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] p-[32px] gap-[16px]
                "
                onSubmit={formik.handleSubmit}
            >
                <FullLogoIcon className="z-1 w-[185px] h-[47px]" />
                <h1 className="text-[24px] font-semibold">Sign In</h1>
                <InputForm
                    formik={formik}
                    placeholder="Email address"
                    name="email"
                    variant="secondary"
                />
                <div className="flex items-center text-[14px] gap-[6px]">
                    <Link href="/sign-up" className="text-primary font-medium">
                        Sign in with windows Hello or a security key
                    </Link>
                    <QuestionRoundedIcon className="w-[18px] h-[18px]" />
                </div>
                <div className="self-end">
                    <Button
                        className="rounded-none w-[100px]"
                        type="submit"
                        value="Next"
                    />
                </div>
            </form>
            <div
                className="
                w-[445px] flex flex-col bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)]
                py-[12px] px-[32px] gap-[16px]
            "
            >
                <div className="flex items-center text-[14px] gap-[10px]">
                    <KeyIcon className="w-[18px] h-[18px]" />
                    <p>Sign-in options</p>
                </div>
            </div>
        </motion.div>
    );
};

export default EmailContent;
