const SkeletonList = () => {
    return (
        <div className="p-[26px]">
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className="
                        w-full py-[20px] flex items-center font-medium border-b
                        border-line cursor-pointer hover:bg-secondary animate-pulse
                    "
                >
                    <div className="w-[60%] flex flex-col gap-[4px]">
                        <div className="h-[22px] w-[100px] bg-slate-300 rounded-[8px]" />
                        <div className="h-[15px] w-[200px] bg-slate-300 rounded-[8px]" />
                    </div>
                    <div className="w-[13.6%] flex items-center justify-center">
                        <div className="w-[24px] h-[24px] rounded-[8px] bg-slate-300" />
                    </div>
                    <div className="w-[13.6%] flex items-center justify-center text-[#8E8E93] text-[12px]">
                        <div className="h-[15px] w-[100px] bg-slate-300 rounded-[8px]" />
                    </div>
                    <div className="w-[13.6%] flex items-center justify-center text-[#8E8E93] text-[12px]">
                        <div className="h-[15px] w-[100px] bg-slate-300 rounded-[8px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonList;
