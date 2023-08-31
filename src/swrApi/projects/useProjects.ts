import useSWR from 'swr';
import { projectsApi } from '.';
import { getCurrentPage } from '@/utils/helpers';
import { useParams, usePathname } from 'next/navigation';
import { PROJECT_PAGE } from '@/utils/constants';

const useProjects = () => {
    const path = usePathname();
    const { projects = [] } = useParams();
    const currentPage = getCurrentPage(path, projects);
    const { data = [], ...rest } = useSWR(currentPage === PROJECT_PAGE ? '?' : null, projectsApi.getProjects);

    return {
        projects: data as Project[],
        ...rest
    };
};

export default useProjects;
