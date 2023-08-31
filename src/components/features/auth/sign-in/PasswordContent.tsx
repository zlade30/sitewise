import * as yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { signInSteps } from '@/utils/constants';
import { Button } from '@/components/shared/buttons';
import { Spinner } from '@/components/shared/progress';
import { ChevronIcon, FullLogoIcon } from '@/public/icons';
import { InputForm } from '@/components/shared/textfields';
import { setAuthCurrentStep, setAuthIsBack } from '@/redux/reducers/app';

const PasswordContent = () => {
    const dispatch = useDispatch();
    const { authIsBack, signInForm } = useAppSelector((state) => state.app);
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        password: yup.string().required('* this is a required field')
    });

    const onSubmit = async ({ password }: { password: string }) => {
        try {
            setIsLoading(true);
            dispatch(setAuthCurrentStep(signInSteps.REMEMBER_ME));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onBack = () => {
        dispatch(setAuthIsBack(true));
        dispatch(setAuthCurrentStep(signInSteps.EMAIL));
    };

    const formik: any = useFormik({
        initialValues: { password: '' },
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
                <h1 className="text-[24px] font-semibold">Enter Password</h1>
                <InputForm
                    type="password"
                    formik={formik}
                    placeholder="Password"
                    name="password"
                    variant="secondary"
                />
                <div className="flex items-center text-[14px] gap-[6px]">
                    <Link
                        href="/password-reset"
                        className="text-primary font-medium"
                    >
                        Forgotten your password?
                    </Link>
                </div>
                <div className="flex items-center text-[14px] gap-[6px]">
                    <Link href="/sign-up" className="text-primary font-medium">
                        Email code to email@email.com
                    </Link>
                </div>
                {isLoading ? (
                    <div className="w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="self-end">
                        <Button
                            className="rounded-none w-[100px]"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                )}
            </form>
        </motion.div>
    );
};

export default PasswordContent;
