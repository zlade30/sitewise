'use client';

import useSWR from 'swr';
import { projectsApi } from '.';

const useProjects = () => {
    const { data = [], ...rest } = useSWR(
        '/projects',
        projectsApi.getProjects,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {
        projects: data as Project[],
        ...rest
    };
};

export default useProjects;
