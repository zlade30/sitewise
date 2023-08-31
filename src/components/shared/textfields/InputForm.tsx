import { twMerge } from 'tailwind-merge';
import { variants } from '@/utils/constants';
import { InputHTMLAttributes, ReactElement } from 'react';

/**
 * Input form component.
 * @param {FormikProps} formik - Formik properties.
 * @param {string} name - The name of the input field.
 * @param {string} label - An optional label for the input.
 * @param {boolean} required - Whether the input is required.
 * @param {React.ReactElement} icon - An optional icon element.
 * @param {string} className - Additional CSS classes for styling input box.
 * @param {string} inputClassName - Additional CSS classes for styling input.
 * @param {boolean} fullWidth - Whether the input should take full width.
 * @param {string} rightText - An optional text to display on the right side.
 * @param {'default' | 'primary' | 'secondary'} variant - The variant of the input.
 * @param {'code' | 'calculator' | 'numpad'} extraType - An optional extra input type.
 * @param {InputHTMLAttributes<HTMLInputElement>} [...props] - Additional input attributes.
 */
const InputForm = ({
    icon,
    name,
    label,
    formik,
    variant,
    required,
    rightText,
    className,
    extraType,
    inputClassName,
    fullWidth = true,
    ...props
}: {
    formik: Formik;
    name: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    rightText?: string;
    className?: string;
    icon?: ReactElement;
    inputClassName?: string;
    onClearInput?: () => void;
    variant: 'default' | 'primary' | 'secondary';
    extraType?: 'code' | 'calculator' | 'numpad' | 'number';
} & InputHTMLAttributes<HTMLInputElement>) => {
    const isError = Boolean(formik.touched[name] && formik.errors[name]);

    const handleVariant = () => {
        if (variant === variants.SECONDARY) {
            return 'bg-transparent py-[6px] border-b border-line gap-[12px]';
        } else if (variant === variants.PRIMARY) {
            return 'bg-secondary px-[12px] py-[10px] rounded-[8px] gap-[12px]';
        } else {
            return 'bg-transparent px-[12px] py-[10px] rounded-[2px] border border-line gap-[4px]';
        }
    };

    const handleValue = () => {
        if (
            extraType === 'code' ||
            extraType === 'calculator' ||
            extraType === 'numpad' ||
            extraType === 'number'
        ) {
            return formik.values[name].toString().replace(/\D/g, '');
        }
        return formik.values[name];
    };

    const handleInputClass = () => {
        if (extraType === 'calculator' || extraType === 'numpad') {
            return 'text-right w-full outline-none bg-transparent';
        } else {
            return 'w-full outline-none bg-transparent';
        }
    };

    const Label = () => {
        if (label) {
            return (
                <div className="flex items-center">
                    <p className="text-[14px] font-medium mb-1">{label}</p>
                    {required && (
                        <p className="text-[14px] font-medium mb-1 ml-1 text-error">
                            *
                        </p>
                    )}
                </div>
            );
        }
    };

    const Icon = () => {
        if (variant === variants.PRIMARY) return icon;
    };

    const RightText = () => {
        if (rightText && !formik.values[name])
            return <p className="text-gray-400">{rightText}</p>;
    };

    const ErrorText = () => {
        if (isError) {
            return (
                <p className="text-[14px] text-error whitespace-nowrap">
                    {`${formik.errors[name]}`}
                </p>
            );
        }
    };

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            <Label />
            <div
                className={twMerge(
                    `${handleVariant()} flex items-center justify-between whitespace-nowrap text-[14px]`,
                    className
                )}
            >
                <div className="w-full flex items-center gap-[12px]">
                    <Icon />
                    <input
                        name={name}
                        value={handleValue()}
                        onChange={formik.handleChange}
                        className={twMerge(handleInputClass(), inputClassName)}
                        {...props}
                    />
                </div>
                <RightText />
            </div>
            <ErrorText />
        </div>
    );
};

export default InputForm;
