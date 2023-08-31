import { CalendarIcon, ChevronIcon } from '@/public/icons';

const Calendar = () => {
    // Usage example:
    const year = 2023;
    const month = 7; // 0-based index (0 = January, 1 = February, ..., 11 = December)

    const getDaysInMonth = (year: number, month: number) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            daysArray.push({ day: date.getDate(), date });
        }

        return daysArray;
    };

    return (
        <div className="w-full flex flex-col gap-[14px]">
            <div className="flex items-center justify-between font-medium">
                <CalendarIcon className="w-[29px] h-[14px] text-primary" />
                <p>August 2023</p>
                <span className="flex items-center gap-[24px] text-gray-400">
                    <ChevronIcon className="w-[12px] h-[12px]" />
                    <ChevronIcon className="w-[12px] h-[12px] rotate-180" />
                </span>
            </div>
            <div className="grid grid-cols-7 place-items-center text-gray-400">
                <p>Su</p>
                <p>Mo</p>
                <p>Tu</p>
                <p>We</p>
                <p>Th</p>
                <p>Fr</p>
                <p>Sa</p>
            </div>
            <div className="grid grid-cols-7 place-items-center text-gray-400 gap-y-2">
                {getDaysInMonth(year, month).map((date) => (
                    <p key={String(date.date)}>{date.day}</p>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
