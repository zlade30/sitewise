import * as yup from 'yup';
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

const Reset = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { authIsBack } = useAppSelector((state) => state.app);
    const schema = yup.object().shape({
        password: yup.string().required('* this is a required field'),
        reEnterPassword: yup.string().required('* this is a required field')
    });

    const onBack = () => {
        dispatch(setAuthIsBack(true));
        dispatch(setAuthCurrentStep(passwordResetSteps.VERIFY));
    };

    const onSubmit = async ({
        password,
        reEnterPassword
    }: {
        password: string;
        reEnterPassword: string;
    }) => {
        if (password === reEnterPassword) {
            setIsLoading(true);
            dispatch(setAuthCurrentStep(passwordResetSteps.DONE));
            setIsLoading(false);
        }
    };

    const formik: any = useFormik({
        initialValues: { password: '', reEnterPassword: '' },
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
                    Reset your password
                </h1>
                <div className="flex items-center text-[14px] gap-[6px]">
                    <p>8 character minimun case sensitive</p>
                </div>
                <InputForm
                    type="password"
                    formik={formik}
                    placeholder="Enter password"
                    name="password"
                    variant="secondary"
                />
                <InputForm
                    type="password"
                    formik={formik}
                    placeholder="Re-enter password"
                    name="reEnterPassword"
                    variant="secondary"
                />
                {isLoading ? (
                    <div className="w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="self-end flex items-center gap-[16px]">
                        <Button
                            onClick={() => {
                                router.push('/sign-in');
                                dispatch(setAuthCurrentStep(signInSteps.LOGIN));
                            }}
                            value="Cancel"
                            className="rounded-none w-[100px] bg-[#CCCCCC] text-black hover:bg-hover-secondary"
                        />
                        <Button
                            type="submit"
                            value="Submit"
                            className="rounded-none w-[100px]"
                        />
                    </div>
                )}
            </form>
        </motion.div>
    );
};

export default Reset;
