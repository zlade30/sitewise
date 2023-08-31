import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactElement } from 'react';

/**
 * Rounded button component.
 * @param {string} className - Additional CSS classes for styling the button.
 * @param {ReactElement} icon - The icon element to display within the button.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} [...props] - Additional button attributes.
 */
const ButtonRounded = ({
    icon,
    className,
    ...props
}: {
    className?: string;
    icon: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={twMerge(
                `bg-secondary p-[12px] rounded-[100%] text-[14px] text-primary hover:bg-hover-secondary`,
                className
            )}
        >
            {icon}
        </button>
    );
};

export default ButtonRounded;
