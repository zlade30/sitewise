import { twMerge } from 'tailwind-merge';
import { variants } from '@/utils/constants';
import { CancelRoundedIcon } from '@/public/icons';
import { ChangeEventHandler, InputHTMLAttributes, ReactElement } from 'react';

/**
 * Input component.
 * @param {ReactElement} icon - Icon element.
 * @param {string} label - Label for the input.
 * @param {string} error - Error message, if any.
 * @param {string} value - Current value of the input.
 * @param {string} rightText - Text to display on the right side.
 * @param {function} onChange - Function to handle input changes.
 * @param {string} className - Additional CSS classes for styling.
 * @param {function} onClearInput - Callback function to clear input.
 * @param {boolean} fullWidth - Whether the input should take full width.
 * @param {('default' | 'primary' | 'secondary')} variant - Input variant.
 * @param {('code' | 'calculator' | 'numpad')} extraType - Extra input type.
 * @param {InputHTMLAttributes<HTMLTextAreaElement>} [...props] - Additional input attributes.
 */
const InputBox = ({
    icon,
    error,
    label,
    value,
    variant,
    onChange,
    rightText,
    className,
    extraType,
    onClearInput,
    fullWidth = true,
    ...props
}: {
    value: string;
    error?: string;
    label?: string;
    rightText?: string;
    className?: string;
    icon?: ReactElement;
    fullWidth?: boolean;
    onClearInput?: () => void | undefined;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    variant: 'default' | 'primary' | 'secondary';
    extraType?: 'code' | 'calculator' | 'numpad';
} & InputHTMLAttributes<HTMLTextAreaElement>) => {
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
            extraType === 'numpad'
        ) {
            return value.toString().replace(/\D/g, '');
        }
        return value;
    };

    const handleInputClass = () => {
        if (extraType === 'calculator' || extraType === 'numpad') {
            return 'text-right w-full outline-none bg-transparent';
        } else {
            return 'w-full outline-none bg-transparent';
        }
    };

    const onClear = () => {
        onClearInput!();
    };

    const Label = () => {
        return label && <p className="text-[16px] font-medium mb-1">{label}</p>;
    };

    const Icon = () => {
        if (variant === variants.PRIMARY) return icon;
    };

    const RightText = () => {
        if (rightText && !value)
            return <p className="text-gray-400">{rightText}</p>;
    };

    const ClearIcon = () => {
        if (
            value &&
            extraType !== 'calculator' &&
            extraType !== 'numpad' &&
            onClearInput
        ) {
            return (
                <CancelRoundedIcon
                    onClick={onClear}
                    className="w-[18px] h-[18px] text-primary"
                />
            );
        }
    };

    const ErrorText = () => {
        if (error) {
            return (
                <p className="text-[14px] text-error whitespace-nowrap">
                    {error}
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
                    <textarea
                        onChange={onChange}
                        value={handleValue()}
                        className={handleInputClass()}
                        {...props}
                    />
                </div>
                <RightText />
                <ClearIcon />
            </div>
            <ErrorText />
        </div>
    );
};

export default InputBox;
