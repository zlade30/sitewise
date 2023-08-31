import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactElement } from 'react';

/**
 * Button component.
 * @param {string} value - The text content of the button.
 * @param {string} className - Additional CSS classes for styling the button.
 * @param {ReactElement | string} icon - Optional icon to display within the button.
 * @param {'left' | 'right'} iconPosition - Position of the icon relative to the text.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} [...props] - Additional button attributes.
 */
const Button = ({
    icon,
    value,
    className,
    iconPosition = 'left',
    ...props
}: {
    value: string;
    className?: string;
    icon?: ReactElement | string;
    iconPosition?: 'left' | 'right';
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={twMerge(
                `flex items-center justify-center gap-[8px] px-[12px] py-[10px] whitespace-nowrap bg-primary
                text-[14px] text-white font-medium rounded-[8px] hover:bg-hover-primary`,
                className
            )}
        >
            {iconPosition === 'left' && icon}
            {value}
            {iconPosition === 'right' && icon}
        </button>
    );
};

export default Button;
