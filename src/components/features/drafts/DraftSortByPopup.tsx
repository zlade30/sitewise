import { ReactElement } from 'react';
import { Divider } from '@/components/shared';
import { Popup } from '@/components/shared/popups';
import { CheckIcon, QuantityIcon, SquareFeetIcon } from '@/public/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    active: boolean;
    value: string;
    icon: ReactElement;
    path?: string;
};

const DraftSortByPopup = (props: PopupProps) => {
    const sortBy = useSearchParams().get('sortBy');
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const sortList: Props[] = [
        {
            active: true,
            value: 'Square Feet',
            path: 'sqft',
            icon: <SquareFeetIcon className="w-[14px] h-[14px]" />
        },
        {
            active: false,
            value: 'Quantity',
            path: 'ea',
            icon: <QuantityIcon className="w-[14px] h-[14px]" />
        }
    ];

    const handleSort = (item: Props) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('sortBy', item.value === 'Square Feet' ? 'sqft' : 'ea');
        current.set('order', 'desc');
        const search = current.toString();
        router.push(`${path}?${search}`);
    };

    return (
        <Popup {...props}>
            <div className="w-[300px] bg-white flex flex-col text-[14px] font-light rounded-[8px]">
                <ul className="list-none">
                    <div
                        className="
                            w-full flex items-center gap-2 font-medium text-gray-400
                            whitespace-nowrap py-[20px]
                        "
                    >
                        <p>Sort By</p>
                        <Divider />
                    </div>
                    {sortList.map((item) => (
                        <li
                            key={item.value}
                            className={`
                                w-full h-[46px] flex items-center justify-between gap-[12px] hover:bg-hover-secondary
                                cursor-pointer px-[16px]`}
                            onClick={() => handleSort(item)}
                        >
                            <div className="flex items-center gap-[12px]">
                                {sortBy === item.path && (
                                    <CheckIcon className="w-[14px] h-[14px]" />
                                )}
                                <p
                                    className={`${
                                        sortBy === item.path
                                            ? 'font-medium'
                                            : 'font-light ml-[26px]'
                                    }`}
                                >
                                    {item.value}
                                </p>
                            </div>
                            {item.icon}
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
};

export default DraftSortByPopup;
