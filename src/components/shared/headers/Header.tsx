'use client';

import Image from 'next/image';
import { useState } from 'react';
import { avatarImg } from '@/public/images';
import { useProjects } from '@/swrApi/projects';
import { getCurrentPage } from '@/utils/helpers';
import { useParams, usePathname } from 'next/navigation';
import { PHOTO_PAGE, PROJECT_DETAILS_PAGE, PROJECT_DETAILS_PAGE_SLUG, PROJECT_PAGE } from '@/utils/constants';
import { ProfilePopup, ProjectDetailsHeader, ProjectListHeader } from '@/components/features/projects';
import { PhotosHeader } from '@/components/features/photos';

const Header = () => {
    const path = usePathname();
    const { slug = [] } = useParams();
    const { projects = [] } = useProjects();
    const currentPage = getCurrentPage(path, slug);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const projectId = slug[PROJECT_DETAILS_PAGE_SLUG];
    const projectDetails = projects.find((item) => item.id === projectId);
    const isPhotoPage = path.includes('photos');
    const isProjectPage = currentPage === PROJECT_PAGE;
    const isProjectDetailsPage = currentPage === PROJECT_DETAILS_PAGE;

    const handleHeader = () => {
        if (isPhotoPage) return <PhotosHeader />;
        if (isProjectPage) return <ProjectListHeader />;
        if (isProjectDetailsPage) return <ProjectDetailsHeader />;
    };

    return (
        <header className="w-full">
            <section className="w-full flex items-center justify-between p-[26px]">
                {!isProjectPage && (
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
                <div className={`${isProjectPage ? 'w-full' : 'justify-end'} flex items-center justify-end`}>
                    <Image onClick={() => setShowProfilePopup(!showProfilePopup)} className="cursor-pointer" src={avatarImg} alt="avatar" />
                    <ProfilePopup open={showProfilePopup} onClose={() => setShowProfilePopup(false)} />
                </div>
            </section>
            {handleHeader()}
        </header>
    );
};

export default Header;
