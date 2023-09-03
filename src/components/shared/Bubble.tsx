import { twMerge } from 'tailwind-merge';
import { CancelIcon, PlusIcon } from '@/public/icons';

const Bubble = ({
    value,
    isAdd,
    onClick,
    isActive,
    isClosable
}: {
    value: string;
    isAdd?: boolean;
    isActive?: boolean;
    isClosable?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                'flex items-center justify-center w-min px-[15px] h-[30px] rounded-[100px] font-medium gap-[10px]',
                isActive ? 'bg-primary text-white' : 'bg-[#F2F2F7] text-black'
            )}
        >
            {isAdd && <PlusIcon className="w-[10px] h-[10px]" />}
            {value}
            {isClosable && <CancelIcon className={twMerge('w-[10px] h-[10px]', isActive ? 'text-white' : 'text-[#868E96]')} />}
        </div>
    );
};

export default Bubble;
