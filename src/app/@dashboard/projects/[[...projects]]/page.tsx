'use client';

import { ProjectDetails, ProjectList } from '@/components/features/projects';
import { PROJECT_PAGE } from '@/utils/constants';
import { getCurrentPage } from '@/utils/helpers';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
    const { projects = [] } = useParams();
    const path = usePathname();
    const currentPage = getCurrentPage(path, projects);

    return currentPage === PROJECT_PAGE ? <ProjectList /> : <ProjectDetails />;
};

export default DashboardPage;
