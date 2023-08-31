import { ChangeEventHandler, InputHTMLAttributes } from 'react';

const Checkbox = ({
    label,
    checked,
    onChange,
    ...props
}: {
    label: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="flex items-center gap-[10px]">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-[20px] h-[20px]"
                {...props}
            />
            <p className="font-semibold">{label}</p>
        </div>
    );
};

export default Checkbox;
