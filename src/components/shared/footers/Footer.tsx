'use client';

import { getCurrentPage } from '@/utils/helpers';
import { useParams, usePathname } from 'next/navigation';
import { PhotosFooter } from '@/components/features/photos';
import { PHOTO_PAGE, PROJECT_DETAILS_PAGE } from '@/utils/constants';
import { ProjectDetailsFooter } from '@/components/features/projects';

const Header = () => {
    const path = usePathname();
    const { slug = [] } = useParams();
    const currentPage = getCurrentPage(path, slug);

    const isPhotoPage = path.includes('photos');
    const isProjectDetailsPage = currentPage === PROJECT_DETAILS_PAGE;

    return (
        <footer className="w-full">
            {isPhotoPage && <PhotosFooter />}
            {isProjectDetailsPage && <ProjectDetailsFooter />}
        </footer>
    );
};

export default Header;
