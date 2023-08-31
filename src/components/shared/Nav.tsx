'use client';

import {
    CalendarIcon,
    FlagIcon,
    NavLogoFullIcon,
    NavLogoIcon,
    ProjectIcon,
    RoundedVideoIcon,
    SidebarIcon
} from '@/public/icons';
import { useState } from 'react';
import { Calendar, Divider } from '.';
import { motion } from 'framer-motion';
import { Button, ButtonRounded } from './buttons';

const Nav = () => {
    const [isMinimize, setIsMinize] = useState(false);

    return (
        <motion.nav
            className="
                w-[300px] h-screen border-r border-line flex flex-col items-center justify-between
                overflow-hidden text-[14px] py-[16px] gap-[24px]
            "
            animate={{ width: isMinimize ? 80 : 300 }}
            transition={{ duration: 0.3 }}
        >
            <section className="w-full flex flex-col items-center gap-[24px] px-[16px]">
                {isMinimize ? (
                    <NavLogoIcon className="w-[50px] h-[50px]" />
                ) : (
                    <NavLogoFullIcon className="w-[200px] h-[100px]" />
                )}
                {isMinimize ? (
                    <ButtonRounded
                        icon={
                            <ProjectIcon className="w-[18px] h-[18px] text-primary" />
                        }
                    />
                ) : (
                    <div
                        className="
                            w-full h-[45px] flex items-center py-[8px] px-[12px] rounded-[12px] bg-[#F2F2F7] font-medium
                            text-primary
                        "
                    >
                        <ProjectIcon className="w-[29px] h-[14px]" />
                        <p>All Projects</p>
                    </div>
                )}
            </section>
            <section
                className="
                    flex-1 flex flex-col items-center gap-[24px] w-full px-[16px] overflow-y-auto overflow-x-hidden
                "
            >
                <div className="w-full">
                    <Divider />
                </div>
                {isMinimize ? (
                    <ButtonRounded
                        icon={
                            <CalendarIcon className="w-[18px] h-[18px] text-primary" />
                        }
                    />
                ) : (
                    <Calendar />
                )}
                <div className="w-full flex items-center gap-2 font-medium text-gray-400">
                    {!isMinimize && <p>Today</p>}
                    <Divider />
                </div>
                {isMinimize ? (
                    <>
                        {[1, 2, 3].map((item) => (
                            <ButtonRounded
                                key={item}
                                icon={
                                    <RoundedVideoIcon className="w-[18px] h-[18px] text-primary" />
                                }
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="w-full rounded-[8px] border border-line p-2 gap-1 flex flex-col"
                            >
                                <p className="text-[12px] font-medium">
                                    Up Next:
                                </p>
                                <div className="flex items-center gap-2 font-medium text-primary">
                                    <RoundedVideoIcon className="w-[18px] h-[18px]" />
                                    <p>10:00 AM</p>
                                </div>
                                <p className="text-primary">
                                    123FDJD (Christian Bale)
                                </p>
                                <Button
                                    value="Join Meeting & Start Visit"
                                    icon={<FlagIcon />}
                                />
                            </div>
                        ))}
                    </>
                )}
            </section>
            <section className="w-full flex flex-col justify-end text-primary px-[16px]">
                <div>
                    <ButtonRounded
                        icon={<SidebarIcon />}
                        onClick={() => setIsMinize(!isMinimize)}
                    />
                </div>
            </section>
        </motion.nav>
    );
};

export default Nav;
