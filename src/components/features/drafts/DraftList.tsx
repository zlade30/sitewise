'use client';

import {
    ChevronIcon,
    CopyIcon,
    EditIcon,
    ExteriorIcon,
    InteriorIcon,
    MoveIcon
} from '@/public/icons';
import Link from 'next/link';
import {
    setManageSuite,
    setManageSuiteStatus,
    setShowSuitesProjectModal,
    setSuiteFormModal
} from '@/redux/reducers/project';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { Bar } from '@/components/shared/progress';
import { ProgressDialog } from '@/components/shared/popups';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SuitesFormModal, SuitesProjectListModal } from '../projects/suites';

const DraftList = () => {
    const dispatch = useDispatch();
    const { drafts } = useAppSelector((state) => state.draft);
    const { suiteFormModal, manageSuiteStatus, showSuitesProjectModal } =
        useAppSelector((state) => state.project);
    const router = useRouter();
    const path = usePathname();
    const order = useSearchParams().get('order');
    const sortBy = useSearchParams().get('sortBy');
    const draftId = useSearchParams().get('draftId');
    const searchParams = useSearchParams();

    const filterQuery = () => {
        if (draftId) {
            return drafts.filter((item) =>
                item.title
                    .toLocaleLowerCase()
                    .includes(draftId.toLocaleLowerCase())
            );
        } else {
            return drafts;
        }
    };

    const sortQuery = () => {
        let sort = [...filterQuery()];
        if (sortBy === 'ea' && order === 'asc') {
            return sort.sort(
                (a, b) =>
                    parseInt(a.quantity.toString()) -
                    parseInt(b.quantity.toString())
            );
        } else if (sortBy === 'ea' && order === 'desc') {
            return sort.sort(
                (a, b) =>
                    parseInt(b.quantity.toString()) -
                    parseInt(a.quantity.toString())
            );
        } else if (sortBy === 'sqft' && order === 'asc') {
            return sort.sort(
                (a, b) =>
                    parseInt(a.sqftFootage.toString()) -
                    parseInt(b.sqftFootage.toString())
            );
        } else if (sortBy === 'sqft' && order === 'desc') {
            return sort.sort(
                (a, b) =>
                    parseInt(b.sqftFootage.toString()) -
                    parseInt(a.sqftFootage.toString())
            );
        } else {
            return sort;
        }
    };

    const list = sortQuery();

    const sortTableBy = (field: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('sortBy', field);
        current.set('order', order === 'desc' ? 'asc' : 'desc');

        const search = current.toString();
        router.push(`${path}?${search}`);
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
        <div className="overflow-hidden flex flex-col gap-[12px] px-[26px] pb-[26px]">
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
            <section
                className="
                    w-full bg-secondary py-[8px] font-medium px-[16px] text-[14px] grid grid-cols-8
                    rounded-[8px]
                "
            >
                <p className="col-span-5">Suite Name</p>
                <div
                    onClick={() => sortTableBy('sqft')}
                    className="flex items-center justify-center gap-[12px] cursor-pointer"
                >
                    <p className="select-none">Sqft.</p>
                    {sortBy === 'sqft' && order === 'desc' ? (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary rotate-90" />
                    ) : (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                    )}
                </div>
                <div
                    onClick={() => sortTableBy('ea')}
                    className="flex items-center justify-center gap-[12px] cursor-pointer"
                >
                    <p className="select-none">Quantity</p>
                    {sortBy === 'ea' && order === 'desc' ? (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary rotate-90" />
                    ) : (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                    )}
                </div>
            </section>
            <section className="w-full h-full flex-col overflow-y-auto relative">
                <Bar />
                {list?.map((item) => (
                    <Link
                        key={item.id}
                        href={`/drafts/${item.id}`}
                        className="
                            w-full py-[12px] font-medium px-[16px] border-b border-line cursor-pointer grid grid-cols-8
                            hover:bg-secondary group/item
                        "
                    >
                        <div className="col-span-5 flex flex-col gap-[4px]">
                            <h1 className="text-[22px] font-bold uppercase">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-[12px] text-[#8E8E93]">
                                {item.type === 'interior' ? (
                                    <InteriorIcon />
                                ) : (
                                    <ExteriorIcon />
                                )}
                                <p className="text-[12px]">{item.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-[#8E8E93] text-[12px]">
                            {`${item.sqftFootage} Sqft`}
                        </div>
                        <div className="flex items-center justify-center gap-[12px] text-[#8E8E93] text-[12px]">
                            {item.quantity}
                        </div>
                        <div className="flex items-center justify-center gap-[24px] invisible group-hover/item:visible">
                            <CopyIcon
                                id="modalIcon"
                                onClick={(evt) => onCopy(item, evt)}
                                className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                            />
                            <MoveIcon
                                id="modalIcon"
                                onClick={(evt) => onMove(item, evt)}
                                className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                            />
                            <EditIcon
                                id="modalIcon"
                                onClick={(evt) => onEdit(item, evt)}
                                className="w-[20px] h-[20px] text-[#002E5B] cursor-pointer"
                            />
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default DraftList;
