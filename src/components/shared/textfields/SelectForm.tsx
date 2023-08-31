import { twMerge } from 'tailwind-merge';
import { variants } from '@/utils/constants';
import { ChevronIcon } from '@/public/icons';
import { InputHTMLAttributes, ReactElement, useEffect, useState } from 'react';

const SelectForm = ({
    data,
    label,
    formik,
    variant,
    required,
    className,
    placeholder,
    ...props
}: {
    formik: Formik;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    data: { value: string; payload?: Object; icon?: ReactElement }[];
    variant: 'default' | 'primary' | 'secondary';
} & InputHTMLAttributes<HTMLDivElement>) => {
    const isError = Boolean(
        formik.touched[props.name!] && formik.errors[props.name!]
    );
    const [open, setOpen] = useState(false);

    const handleVariant = () => {
        if (variant === variants.SECONDARY) {
            return 'bg-transparent py-[6px] border-b border-line gap-[12px]';
        } else if (variant === variants.PRIMARY) {
            return 'bg-secondary px-[12px] py-[10px] rounded-[8px] gap-[12px]';
        } else {
            return 'bg-transparent px-[12px] py-[10px] rounded-[2px] border border-line gap-[4px]';
        }
    };

    const onSelectItem = (item: { value: string; payload?: Object }) => {
        formik.setFieldValue(props.name!, {
            value: item.value,
            payload: item.payload
        });
        setOpen(false);
    };

    const onCloseAnywhere = () => {
        setOpen(false);
    };
    const onDisableCloseTemporarily = () => {
        document.removeEventListener('click', onCloseAnywhere);
    };
    const onActivateClose = () => {
        document.addEventListener('click', onCloseAnywhere);
    };

    const renderError = () => {
        const error: any = formik.errors[props.name!];
        return error['value'];
    };

    useEffect(() => {
        document.addEventListener('click', onCloseAnywhere);
        return () => {
            document.removeEventListener('click', onCloseAnywhere);
        };
    }, [open]);

    return (
        <div>
            {label && (
                <div className="flex items-center">
                    <p className="text-[16px] font-medium mb-1">{label}</p>
                    {required && (
                        <p className="text-[16px] font-medium mb-1 ml-1 text-error">
                            *
                        </p>
                    )}
                </div>
            )}
            <div
                className={twMerge(
                    `${handleVariant()} w-full cursor-pointer flex items-center justify-between whitespace-nowrap
                    text-[14px] relative`,
                    className
                )}
                onClick={() => setOpen(!open)}
                onMouseEnter={() => onDisableCloseTemporarily}
                onMouseLeave={() => onActivateClose}
                {...props}
            >
                {formik.values[props.name!]['value'] || (
                    <p className="text-gray-400">{placeholder}</p>
                )}
                <ChevronIcon
                    className={`${
                        open ? 'scale-x-[1]' : 'scale-x-[-1]'
                    } rotate-90`}
                />
                {open && (
                    <div className="absolute w-full left-0 top-0 mt-[45px]">
                        {data.map((item) => (
                            <div
                                key={item.value}
                                className={`
                                    w-full cursor-pointer flex items-center justify-between whitespace-nowrap
                                    text-[14px] hover:bg-hover-secondary px-[12px] py-[10px] bg-white
                                `}
                                onClick={() => onSelectItem(item)}
                            >
                                {item.value}
                                {item.icon}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isError && (
                <p className="text-[14px] text-error whitespace-nowrap">
                    {renderError()}
                </p>
            )}
        </div>
    );
};

export default SelectForm;
