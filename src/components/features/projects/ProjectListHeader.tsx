import { useState } from 'react';
import { Tab } from '@/components/shared';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shared/textfields';
import { ButtonRounded } from '@/components/shared/buttons';
import { ListIcon, ReloadIcon, SearchIcon } from '@/public/icons';

const ProjectListHeader = () => {
    const router = useRouter();
    const [tabs, setTabs] = useState<TabProps[]>([
        {
            name: 'All',
            active: true
        },
        {
            name: 'Today',
            active: false
        },
        {
            name: 'Scheduled',
            active: false
        },
        {
            name: 'Costing',
            active: false
        },
        {
            name: 'Drafts',
            active: false
        }
    ]);
    const [selectedTab, setSelectedTab] = useState<{
        name: string;
        active: boolean;
    }>();

    const onSelectTab = (tab: TabProps) => {
        setTabs(tabs.map((item) => (item.name === tab.name ? { ...item, active: true } : { ...item, active: false })));
        setSelectedTab(tab);
    };

    return (
        <div className="w-full flex flex-col px-[26px]">
            <section>
                <h1 className="font-bold text-[32px] mb-[16px]">Projects</h1>
                <div className="w-full flex items-center justify-between mb-[16px]">
                    <Tab tabs={tabs} onSelectTab={onSelectTab} />
                    <div className="flex items-center gap-[12px]">
                        <ButtonRounded icon={<ReloadIcon />} />
                        <ButtonRounded icon={<ListIcon />} />
                        <Input
                            variant="primary"
                            placeholder="Search"
                            className="w-[300px]"
                            onChange={() => ''}
                            value=""
                            icon={<SearchIcon className="text-primary" />}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectListHeader;
