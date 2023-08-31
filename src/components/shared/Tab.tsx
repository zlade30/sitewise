type TabProps = {
    tabs: { name: string; active: boolean }[];
    onSelectTab?: (_: { name: string; active: boolean }) => void;
};

const Tab = ({ tabs, onSelectTab }: TabProps) => {
    return (
        <ul className="flex items-center gap-[24px] list-none text-[14px] font-semibold">
            {tabs.map((tab) => (
                <li
                    className={`
                        ${
                            tab.active
                                ? 'border-b-[2px] border-primary text-primary'
                                : 'text-gray-500'
                        }
                        pb-2 cursor-pointer
                    `}
                    key={tab.name}
                    onClick={() => onSelectTab!(tab)}
                >
                    {tab.name}
                </li>
            ))}
        </ul>
    );
};

export default Tab;
