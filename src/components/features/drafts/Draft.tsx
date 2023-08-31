'use client';

import dynamic from 'next/dynamic';
import { useAppSelector } from '@/redux/store';
import { Spinner } from '@/components/shared/progress';

const TakeOffs = dynamic(
    () => import('@/components/features/projects/take-offs/TakeOffs'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }
);
const DraftDetails = dynamic(
    () => import('@/components/features/drafts/DraftDetails'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }
);

const Draft = () => {
    const { draftsCurrentTab } = useAppSelector((state) => state.draft);

    return draftsCurrentTab === 'suite' ? <DraftDetails /> : <TakeOffs />;
};

export default Draft;
