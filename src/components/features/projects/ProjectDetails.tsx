'use client';

import {
    AcresIcon,
    ContactIcon,
    DirectionIcon,
    EmailIcon,
    InspectionIcon,
    ManagerIcon,
    PhoneIcon,
    PinIcon,
    RoundedVideoIcon,
    SQFTIcon
} from '@/public/icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Divider } from '@/components/shared';
import { avatarImg, mapImg } from '@/public/images';
import { Button } from '@/components/shared/buttons';
import { InputBox } from '@/components/shared/textfields';
import { appointmentFormatDate, formatDate } from '@/utils/helpers';
import { useProjects } from '@/swrApi/projects';
import { PROJECT_DETAILS_PAGE_SLUG } from '@/utils/constants';

const ProjectDetails = () => {
    const { projects = [] } = useParams();
    const { projects: list = [] } = useProjects();
    const projectId = projects[PROJECT_DETAILS_PAGE_SLUG];
    const projectDetails = list.find((item) => item.id === projectId);

    return (
        <div className="w-full h-full flex flex-col items-center gap-[12px] overflow-y-auto">
            <section className="w-full flex flex-col gap-[12px]">
                <h3 className="text-[22px] font-bold">Project Summary</h3>
                <Divider />
                <section className="w-full grid grid-cols-3 text-[14px] font-medium">
                    <div className="flex flex-col gap-[12px]">
                        <p>Project ID</p>
                        <p className="font-semibold text-[18px]">{projectDetails?.id}</p>
                        <p>Analyst</p>
                        <div className="flex items-center gap-[12px]">
                            <Image src={avatarImg} alt="avatar" />
                            <p className="font-semibold text-[18px]">{projectDetails?.analyst.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <p>Site Contact</p>
                        <div className="flex items-center gap-[12px]">
                            <ManagerIcon className="w-[18px] h-[18px] self-start mt-[2px]" />
                            <div>
                                <p className="font-semibold text-[18px]">{projectDetails?.siteContact.name}</p>
                                <p>Property Manager</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-[12px] text-primary">
                            <PhoneIcon className="w-[18px] h-[18px]" />
                            <p className="font-semibold text-[18px] underline">{projectDetails?.siteContact.phone}</p>
                        </div>
                        <div className="flex items-center gap-[12px] text-primary">
                            <EmailIcon className="w-[18px] h-[18px]" />
                            <p className="font-semibold text-[18px] underline">{projectDetails?.siteContact.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <p>Opportunity Contact</p>
                        <div className="flex items-center gap-[12px]">
                            <ContactIcon className="w-[30px] h-[30px]" />
                            <p className="font-semibold text-[18px]">{projectDetails?.opportunityContact}</p>
                        </div>
                        <p>Site Visit</p>
                        <div className="flex items-center gap-[12px]">
                            <RoundedVideoIcon className="w-[18px] h-[18px]" />
                            <p className="font-semibold text-[18px]">{appointmentFormatDate(new Date(projectDetails?.siteVisit!))}</p>
                        </div>
                    </div>
                </section>
            </section>
            <section className="w-full flex flex-col gap-[12px]">
                <h3 className="text-[22px] font-bold">Property Information</h3>
                <Divider />
                <section className="w-full grid grid-cols-3 text-[14px] font-medium">
                    <div className="flex flex-col col-span-2 gap-[12px]">
                        <p>Description</p>
                        <p className="font-semibold text-[18px]">{projectDetails?.description}</p>
                        <div className="w-full grid grid-cols-2 gap-[12px]">
                            <div className="flex flex-col gap-[12px]">
                                <p>Size</p>
                                <div className="flex items-center gap-[12px]">
                                    <SQFTIcon className="w-[18px] h-[18px] self-start mt-[2px]" />
                                    <p className="font-semibold text-[18px]">{`${projectDetails?.size.sqft} sqft`}</p>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <AcresIcon className="w-[18px] h-[18px] self-start mt-[2px]" />
                                    <p className="font-semibold text-[18px]">{`${projectDetails?.size.acres} acres`}</p>
                                </div>
                                <p>Date of Inspection</p>
                                <div className="flex items-center gap-[12px]">
                                    <InspectionIcon className="w-[18px] h-[18px]" />
                                    <p className="font-semibold text-[18px]">{formatDate(new Date(projectDetails?.inspectionDate!))}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <p>Address</p>
                                <div className="flex items-center gap-[12px]">
                                    <PinIcon className="w-[18px] h-[18px] self-start mt-[2px]" />
                                    <p className="font-semibold text-[18px]">{projectDetails?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <div className="w-[256px] border border-line rounded-[8px]">
                            <Image className="rounded-t-[8px]" src={mapImg} alt="direction" priority />
                            <div className="p-2">
                                <Button
                                    value="Get Directions"
                                    icon={<DirectionIcon />}
                                    className="bg-secondary hover:bg-hover-secondary w-full text-primary"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="w-full flex flex-col gap-[12px]">
                <h3 className="text-[22px] font-bold">General Notes</h3>
                <Divider />
                <InputBox variant="primary" value="" onChange={() => ''} placeholder="Notes" />
            </section>
        </div>
    );
};

export default ProjectDetails;
