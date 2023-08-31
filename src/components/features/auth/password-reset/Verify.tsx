import * as yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/components/shared/buttons';
import { Spinner } from '@/components/shared/progress';
import { ChevronIcon, FullLogoIcon } from '@/public/icons';
import { InputForm } from '@/components/shared/textfields';
import { passwordResetSteps, signInSteps } from '@/utils/constants';
import { setAuthCurrentStep, setAuthIsBack } from '@/redux/reducers/app';

const Verify = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { authIsBack } = useAppSelector((state) => state.app);
    const [isLoading, setIsLoading] = useState(false);
    const schema = yup.object().shape({
        code: yup.string().required('* this is a required field')
    });

    const onBack = () => {
        dispatch(setAuthIsBack(true));
        dispatch(setAuthCurrentStep(passwordResetSteps.METHOD));
    };

    const onSubmit = async ({ code }: { code: string }) => {
        setIsLoading(true);
        dispatch(setAuthCurrentStep(passwordResetSteps.RESET));
        setIsLoading(false);
    };

    const formik: any = useFormik({
        initialValues: { code: '' },
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
                <p className="w-full text-center font-semibold">Verify</p>
            </div>
            <form
                className="
                    w-[445px] flex flex-col bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] p-[32px] gap-[16px]
                "
                onSubmit={formik.handleSubmit}
            >
                <FullLogoIcon className="z-1 w-[185px] h-[47px]" />
                <h1 className="text-[24px] font-semibold">
                    Verify your identity
                </h1>
                <div className="flex items-center text-[14px] gap-[6px]">
                    <p>
                        We just sent a code to myname@gmail.com. Check your
                        email for a message from the Microsoft account team, and
                        enter the code here.
                    </p>
                </div>
                <InputForm
                    formik={formik}
                    placeholder="Enter code"
                    name="code"
                    variant="secondary"
                    extraType="code"
                />
                <div className="flex items-center text-[14px] gap-[6px]">
                    <Link href="/sign-up" className="text-primary font-medium">
                        Verify your identity
                    </Link>
                </div>
                {isLoading ? (
                    <div className="w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="self-end flex items-center gap-[16px]">
                        <Button
                            type="button"
                            onClick={() => {
                                router.push('/sign-in');
                                dispatch(setAuthCurrentStep(signInSteps.LOGIN));
                            }}
                            value="Cancel"
                            className="rounded-none w-[100px] bg-[#CCCCCC] text-black hover:bg-hover-secondary"
                        />
                        <Button
                            type="submit"
                            value="Next"
                            className="w-[100px] rounded-none"
                        />
                    </div>
                )}
            </form>
        </motion.div>
    );
};

export default Verify;
