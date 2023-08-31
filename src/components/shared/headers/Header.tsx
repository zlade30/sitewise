'use client';

import { useParams, usePathname } from 'next/navigation';
import { avatarImg } from '@/public/images';
import { getCurrentPage } from '@/utils/helpers';
import { PROJECT_DETAILS_PAGE, PROJECT_PAGE } from '@/utils/constants';
import { useProjects } from '@/swrApi/projects';
import Image from 'next/image';
import { ProfilePopup } from '@/components/features/projects';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Header = () => {
    const { projects = [] } = useParams();
    const path = usePathname();
    const currentPage = getCurrentPage(path, projects);
    const { projects: list = [] } = useProjects();
    const projectDetails = list[0];
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const isProjectPage = currentPage === PROJECT_PAGE;
    const isProjectDetailsPage = currentPage === PROJECT_DETAILS_PAGE;

    console.log(currentPage);

    return (
        <header className="w-full p-[26px]">
            <section className="w-full flex items-center justify-between">
                {isProjectDetailsPage && (
                    <div className="w-full flex items-center text-[14px] gap-[12px]">
                        <div className="flex items-center gap-[8px] text-[#636366]">
                            <p className="font-medium">ID:</p>
                            <p className="font-light">{projectDetails?.id}</p>
                        </div>
                        <div className="w-[1px] h-[20px] border border-line" />
                        <div className="flex items-center gap-[8px] text-[#636366]">
                            <p className="font-medium">Site Contact:</p>
                            <p className="font-light">{projectDetails?.siteContact.name}</p>
                        </div>
                        <div className="w-[1px] h-[20px] border border-line" />
                        <div className="flex items-center gap-[8px] text-[#636366]">
                            <p className="font-medium">Opportunity Contact:</p>
                            <p className="font-light">{projectDetails?.opportunityContact}</p>
                        </div>
                        <div className="w-[1px] h-[20px] border border-line" />
                        <div className="flex items-center gap-[8px] text-[#636366]">
                            <p className="font-medium">Address:</p>
                            <p className="font-light">{projectDetails?.address}</p>
                        </div>
                    </div>
                )}
                <div className={`${isProjectPage ? 'justify-end' : ''} w-[100px] flex items-center justify-end`}>
                    <Image onClick={() => setShowProfilePopup(!showProfilePopup)} className="cursor-pointer" src={avatarImg} alt="avatar" />
                    <ProfilePopup open={showProfilePopup} onClose={() => setShowProfilePopup(false)} />
                </div>
            </section>
        </header>
    );
};

export default Header;
