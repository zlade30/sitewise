'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/shared/buttons';
import { ChevronIcon, FilterIcon } from '@/public/icons';
import { Tab } from '@/components/shared';
import { useState } from 'react';
import { getCurrentPage } from '@/utils/helpers';
import { PHOTO_DETAILS_PAGE_SLUG, PHOTO_PAGE } from '@/utils/constants';

const PhotosHeader = () => {
    const router = useRouter();
    const path = usePathname();
    const { slug = [] } = useParams();
    const photoId = slug[PHOTO_DETAILS_PAGE_SLUG];
    const currentPage = getCurrentPage(path, slug);
    const [tabs, setTabs] = useState<TabProps[]>([
        {
            name: 'All',
            active: true
        },
        {
            name: 'Electric Boxes',
            active: false
        },
        {
            name: 'Deleted',
            active: false
        }
    ]);
    const [selectedTab, setSelectedTab] = useState<{
        name: string;
        active: boolean;
    }>();

    const isPhotoPage = currentPage === PHOTO_PAGE;

    const onSelectTab = (tab: TabProps) => {
        setTabs(tabs.map((item) => (item.name === tab.name ? { ...item, active: true } : { ...item, active: false })));
        setSelectedTab(tab);
    };

    const handleBack = () => {
        router.push(path.replace(photoId, ''));
    };

    return (
        <div className="w-full flex flex-col gap-[24px] px-[26px]">
            <section className="w-full flex items-center gap-[16px]">
                <ChevronIcon onClick={handleBack} className="w-[24px] h-[24px] cursor-pointer" />
                <h1 className="font-bold text-[32px]">Photos</h1>
            </section>
            {isPhotoPage && (
                <section className="w-full flex items-center justify-between">
                    <Tab tabs={tabs} onSelectTab={onSelectTab} />
                    <Button
                        value="Filter"
                        icon={<FilterIcon className="w-[18px] h-[18px]" />}
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                    />
                </section>
            )}
        </div>
    );
};

export default PhotosHeader;
