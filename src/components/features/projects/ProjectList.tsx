'use client';

import Link from 'next/link';
import Image from 'next/image';
import { avatarImg } from '@/public/images';
import { useProjects } from '@/swrApi/projects';
import { appointmentFormatDate } from '@/utils/helpers';
import { ChevronIcon, ListIcon, PersonWaveIcon, PinIcon, RoundedVideoIcon } from '@/public/icons';
import { FallbackEmpty, FallbackError, FallbackSpinner } from '@/components/shared/fallbacks';

const ProjectList = () => {
    const { projects = [], isLoading, error } = useProjects();

    if (error) return <FallbackError content="Something went wrong." />;
    if (isLoading) return <FallbackSpinner />;
    return (
        <div className="overflow-hidden h-full flex flex-col gap-[12px] px-[26px] pb-[26px]">
            <section
                className="
                    w-full bg-secondary py-[8px] font-medium px-[16px] text-[14px] grid grid-cols-7
                    rounded-[8px]
                "
            >
                <p className="col-span-4">Project</p>
                <p className="text-center">Assigned</p>
                <div className="flex items-center justify-center gap-[12px] cursor-pointer">
                    <p className="select-none">Site Contact</p>
                    <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                </div>
                <div className="flex items-center justify-center gap-[12px] cursor-pointer">
                    <p className="select-none">Appointment</p>
                    <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                </div>
            </section>
            {projects.length > 0 ? (
                <section className="w-full h-full overflow-y-auto">
                    {projects.map((item) => (
                        <Link
                            key={item.id}
                            href={`/projects/${item.id}`}
                            className="
                                w-full py-[12px] font-medium px-[16px] border-b border-line cursor-pointer grid grid-cols-7
                                hover:bg-secondary
                            "
                        >
                            <div className="col-span-4 flex flex-col gap-[4px]">
                                <h1 className="text-[22px] font-bold uppercase">{item.id}</h1>
                                <div className="flex items-center gap-[12px] text-[#8E8E93]">
                                    <PinIcon className="w-[20px] h-[20px]" />
                                    <p className="text-[12px]">{item.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Image className="w-[24px] h-[24px]" src={avatarImg} alt="avatar" />
                            </div>
                            <div className="flex items-center justify-center text-[#8E8E93] text-[12px]">{item.siteContact?.name}</div>
                            <div className="flex items-center justify-center gap-[12px] text-[#8E8E93] text-[12px]">
                                {item.status === 'in-person' ? (
                                    <PersonWaveIcon className="w-[20px] h-[20px]" />
                                ) : (
                                    <RoundedVideoIcon className="w-[20px] h-[20px]" />
                                )}
                                <p>{appointmentFormatDate(new Date(item.siteVisit))}</p>
                            </div>
                        </Link>
                    ))}
                </section>
            ) : (
                <FallbackEmpty icon={<ListIcon className="w-[50px] h-[50px] text-[#8E8E93]" />} content="List is currently empty" />
            )}
        </div>
    );
};

export default ProjectList;
