'use client';

import {
    ChevronIcon,
    CopyIcon,
    EditIcon,
    InfoIcon,
    ListIcon,
    MoveIcon,
    TableIcon,
    WarningIcon
} from '@/public/icons';
import {
    setManageSuite,
    setManageSuiteStatus,
    setShowSuitesListModal,
    setShowSuitesProjectModal,
    setSuiteFormModal
} from '@/redux/reducers/project';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { draftsTab } from '@/utils/constants';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/components/shared/buttons';
import { ProgressDialog } from '@/components/shared/popups';
import { setDraftsCurrentTab } from '@/redux/reducers/draft';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { SuitesFormModal, SuitesProjectListModal } from '../projects/suites';

const DraftDetailsHeader = () => {
    const router = useRouter();
    const path = usePathname();
    const dispatch = useDispatch();
    const { draftId } = useParams();
    const { drafts, draftsCurrentTab } = useAppSelector((state) => state.draft);
    const { showSuitesProjectModal, manageSuiteStatus, suiteFormModal } =
        useAppSelector((state) => state.project);
    const currentDraft = drafts.find((item) => item.id === draftId);

    const handleTitle = () => {
        if (draftsCurrentTab === draftsTab.SUITE) return 'Suite Details';
        else return currentDraft?.title;
    };

    const handleSuiteClassName = () => {
        if (draftsCurrentTab === draftsTab.SUITE) {
            return 'bg-primary hover:text-white';
        } else {
            return 'bg-secondary text-primary hover:bg-hover-secondary';
        }
    };

    const handleTakeOffsClassName = () => {
        if (draftsCurrentTab === draftsTab.TAKE_OFFS) {
            return 'bg-primary hover:text-white';
        } else {
            return 'bg-secondary text-primary hover:bg-hover-secondary';
        }
    };

    const onCopy = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.preventDefault();
        dispatch(setShowSuitesProjectModal(true));
        dispatch(setManageSuite({ suite, action: 'copy', isDraft: true }));
    };

    const onMove = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.preventDefault();
        dispatch(setShowSuitesProjectModal(true));
        dispatch(setManageSuite({ suite, action: 'move', isDraft: true }));
    };

    const onEdit = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.preventDefault();
        dispatch(
            setSuiteFormModal({
                suite,
                show: true,
                isEdit: true,
                isDraft: true,
                type: suite.type
            })
        );
    };

    return (
        <div className="w-full flex flex-col gap-[24px] p-[26px] pb-[0px]">
            <SuitesProjectListModal
                open={showSuitesProjectModal}
                onClose={() => dispatch(setShowSuitesProjectModal(false))}
            />
            <ProgressDialog
                onClose={() => {
                    dispatch(
                        setManageSuiteStatus({
                            ...manageSuiteStatus,
                            show: false
                        })
                    );
                }}
                open={manageSuiteStatus.show}
                statusRequest={manageSuiteStatus}
            />
            <SuitesFormModal
                open={suiteFormModal.show}
                onClose={() =>
                    dispatch(
                        setSuiteFormModal({
                            ...suiteFormModal,
                            show: false,
                            isDraft: true
                        })
                    )
                }
            />
            <section className="w-full flex items-center gap-[16px]">
                <ChevronIcon
                    onClick={() => router.push('/drafts')}
                    className="w-[24px] h-[24px] cursor-pointer"
                />
                {<h1 className="font-bold text-[32px]">{handleTitle()}</h1>}
            </section>
            <section className="w-full flex items-center justify-between">
                <div className="p-1 bg-secondary flex items-center gap-2 rounded-[8px] w-min">
                    <Button
                        value="Suite"
                        className={handleSuiteClassName()}
                        icon={<InfoIcon />}
                        onClick={() => dispatch(setDraftsCurrentTab('suite'))}
                    />
                    <Button
                        value="Take-offs"
                        className={handleTakeOffsClassName()}
                        icon={<ListIcon />}
                        onClick={() =>
                            dispatch(setDraftsCurrentTab('take-offs'))
                        }
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        value="View Summary"
                        onClick={() => router.push(`${path}/summary`)}
                        icon={<TableIcon className="w-[18px] h-[18px]" />}
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                    />
                    {draftsCurrentTab === 'take-offs' && (
                        <>
                            <p className="text-[14px]">Suite:</p>
                            <Button
                                value={currentDraft?.title! || 'Select'}
                                onClick={() =>
                                    dispatch(setShowSuitesListModal(true))
                                }
                                className="bg-secondary text-primary hover:bg-hover-secondary min-w-[100px]"
                            />
                        </>
                    )}
                </div>
            </section>
            <section className="flex items-center justify-between border border-line rounded-[8px] w-full p-[12px]">
                <div className="flex items-center gap-[14px]">
                    <WarningIcon className="w-[18px] h-[18px] text-[#8E8E93] cursor-pointer" />
                    <p className="font-medium text-[14px] text-[#8E8E93]">
                        Suite not assigned to project
                    </p>
                </div>
                <div className="flex items-center justify-end gap-[20px]">
                    <CopyIcon
                        id="modalIcon"
                        onClick={(evt) => onCopy(currentDraft!, evt)}
                        className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                    />
                    <MoveIcon
                        id="modalIcon"
                        onClick={(evt) => onMove(currentDraft!, evt)}
                        className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                    />
                    <EditIcon
                        id="modalIcon"
                        onClick={(evt) => onEdit(currentDraft!, evt)}
                        className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                    />
                </div>
            </section>
        </div>
    );
};

export default DraftDetailsHeader;
