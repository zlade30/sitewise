import { twMerge } from 'tailwind-merge';
import { variants } from '@/utils/constants';
import { generateRandomString } from '@/utils/helpers';
import { ChevronIcon, ChevronUpdownIcon } from '@/public/icons';
import { InputHTMLAttributes, useEffect, useState } from 'react';

const Select = ({
    label,
    variant,
    options,
    required,
    className,
    optionValue,
    placeholder,
    valueHasIcon,
    isDropDownIconRight,
    isIconPrimary = true,
    ...props
}: {
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    valueHasIcon?: boolean;
    options: OptionsValue[];
    isIconPrimary?: boolean;
    optionValue: OptionsValue;
    isDropDownIconRight?: boolean;
    variant: 'default' | 'primary' | 'secondary';
} & InputHTMLAttributes<HTMLDivElement>) => {
    const [open, setOpen] = useState(false);
    const [payload, setPayload] = useState<OptionsValue>(optionValue);

    const handleVariant = () => {
        if (variant === variants.SECONDARY) {
            return 'bg-transparent py-[6px] border-b border-line gap-[12px]';
        } else if (variant === variants.PRIMARY) {
            return 'bg-secondary px-[12px] py-[10px] rounded-[8px] gap-[12px]';
        } else {
            return 'bg-transparent px-[12px] py-[10px] rounded-[2px] border border-line gap-[4px]';
        }
    };

    const onSelectItem = (item: OptionsValue) => {
        setPayload(item);
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

    useEffect(() => {
        document.addEventListener('click', onCloseAnywhere);
        return () => {
            document.removeEventListener('click', onCloseAnywhere);
        };
    }, [open]);

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center">
                    <p className="text-[16px] font-medium mb-1">{label}</p>
                    {required && <p className="text-[16px] font-medium mb-1 ml-1 text-error">*</p>}
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
                <div className="flex items-center gap-[10px]">
                    {valueHasIcon && payload.icon}
                    {payload.label || <p className="text-gray-400">{placeholder}</p>}
                </div>
                {isIconPrimary ? (
                    <ChevronIcon className={`${open ? 'scale-x-[1]' : 'scale-x-[-1]'} rotate-90`} />
                ) : (
                    <ChevronUpdownIcon className="text-[#868E96] w-[18px] h-[18px]" />
                )}

                {open && (
                    <div className="absolute w-full left-0 top-0 mt-[45px] dropdown-shadow border border-[#E9ECEF]">
                        {options.map((item) => (
                            <div
                                key={generateRandomString(10)}
                                className={`
                                    w-full cursor-pointer flex items-center justify-between whitespace-nowrap
                                    text-[14px] hover:bg-hover-secondary px-[12px] py-[10px] bg-white
                                `}
                                onClick={() => onSelectItem(item)}
                            >
                                <div className="flex items-center gap-[10px]">
                                    {!isDropDownIconRight && item.icon}
                                    {item.label}
                                </div>
                                {isDropDownIconRight && item.icon}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;
