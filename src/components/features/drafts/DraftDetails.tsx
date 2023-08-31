'use client';

import Image from 'next/image';
import { avatarImg } from '@/public/images';
import { useParams } from 'next/navigation';
import { Divider } from '@/components/shared';
import { useAppSelector } from '@/redux/store';
import { appointmentFormatDate } from '@/utils/helpers';
import { CalendarIcon, ExteriorIcon, InteriorIcon } from '@/public/icons';

const DraftDetails = () => {
    const { draftId } = useParams();
    const { drafts } = useAppSelector((state) => state.draft);
    const draftDetails = drafts.find((item) => item.id === draftId);

    return (
        <div className="w-full h-full flex flex-col items-center gap-[12px] overflow-y-auto">
            <section className="w-full flex flex-col gap-[12px]">
                <Divider />
                <section className="w-full grid grid-cols-3 text-[14px] font-medium">
                    <div className="flex flex-col gap-[12px]">
                        <p>Name</p>
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-[18px]">
                                {draftDetails?.title}
                            </p>
                            <div className="flex items-center gap-[12px]">
                                {draftDetails?.type === 'interior' ? (
                                    <InteriorIcon className="w-[18px] h-[18px]" />
                                ) : (
                                    <ExteriorIcon className="w-[18px] h-[18px]" />
                                )}
                                <p className="text-[18px] font-semibold">
                                    {draftDetails?.type === 'interior'
                                        ? 'Interior Suite'
                                        : 'Exterior Suite'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <p>Analyst</p>
                        <div className="flex items-center gap-[12px]">
                            <Image src={avatarImg} alt="avatar" />
                            <p className="font-semibold text-[18px]">
                                {draftDetails?.analyst}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <p>Created</p>
                        <div className="flex items-center gap-[12px]">
                            <CalendarIcon className="w-[18px] h-[18px]" />
                            <p className="font-semibold text-[18px]">
                                {appointmentFormatDate(
                                    new Date(draftDetails?.dateCreated!)
                                )}
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default DraftDetails;
