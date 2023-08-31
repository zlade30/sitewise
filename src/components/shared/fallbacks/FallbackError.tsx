import { WarningIcon } from '@/public/icons';

const FallbackError = ({ content }: { content: string }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-[20px]">
            <WarningIcon className="w-[50px] h-[50px] text-error" />
            <p className="font-medium text-[14px]">{content}</p>
        </div>
    );
};

export default FallbackError;
