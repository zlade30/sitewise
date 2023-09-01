'use client';

import { PHOTO_DETAILS_PAGE, PHOTO_PAGE, PROJECT_DETAILS_PAGE, PROJECT_PAGE } from '@/utils/constants';
import { getCurrentPage } from '@/utils/helpers';
import { useParams, usePathname } from 'next/navigation';
import { ProjectDetails, ProjectList } from '@/components/features/projects';
import { Photos, PhotosDetails } from '@/components/features/photos';

const DashboardPage = () => {
    const { slug = [] } = useParams();
    const path = usePathname();
    const currentPage = getCurrentPage(path, slug);

    const isPhotoDetailsPage = currentPage === PHOTO_DETAILS_PAGE;
    const isPhotoPage = currentPage === PHOTO_PAGE;
    const isProjectDetailsPage = currentPage === PROJECT_DETAILS_PAGE;
    const isProjectPage = currentPage === PROJECT_PAGE;

    return (
        <>
            {isPhotoDetailsPage && <PhotosDetails />}
            {isPhotoPage && <Photos />}
            {isProjectDetailsPage && <ProjectDetails />}
            {isProjectPage && <ProjectList />}
        </>
    );
};

export default DashboardPage;
