'use client';

import { Button } from '@/components/shared/buttons';
import { usePathname, useRouter } from 'next/navigation';
import { NoteIcon, PhotoIcon, DownloadIcon, ElectricIcon } from '@/public/icons';

const ProjectDetailsFooter = () => {
    const path = usePathname();
    const router = useRouter();

    const handlePhotos = () => {
        router.push(`${path}/photos`);
    };

    return (
        <div className="w-full flex items-center justify-between border-t border-t-line p-[26px]">
            <div className="flex items-center gap-[24px]">
                <Button value="Electrical Boxes" icon={<ElectricIcon />} />
                <Button value="Photos" icon={<PhotoIcon />} onClick={handlePhotos} />
            </div>
            <div className="flex items-center gap-[24px]">
                <Button className="bg-secondary text-primary hover:bg-hover-secondary" value="Export Project" icon={<DownloadIcon />} />
                <Button value="Notes" icon={<NoteIcon />} />
            </div>
        </div>
    );
};

export default ProjectDetailsFooter;
