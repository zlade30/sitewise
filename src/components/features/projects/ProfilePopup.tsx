'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpIcon } from '@/public/icons';
import { profileImg } from '@/public/images';
import { Popup } from '@/components/shared/popups';
import { Button } from '@/components/shared/buttons';
import { Spinner } from '@/components/shared/progress';

const ProfilePopup = (props: PopupProps) => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logout = () => {
        const timeOut = setTimeout(() => {
            router.push('/sign-in');
        }, 1000);
        return timeOut;
    };

    useEffect(() => {
        if (isLoggingOut) {
            logout();
        }
        return () => {
            clearTimeout(logout());
        };
    }, [isLoggingOut]);

    return (
        <Popup {...props}>
            <div className="w-[462px] flex flex-col gap-[24px] font-medium text-[14px]">
                <section className="flex items-center gap-[12px]">
                    <Image
                        className="self-start"
                        src={profileImg}
                        alt="profile"
                    />
                    <div className="flex flex-col gap-[8px]">
                        <p className="text-[18px] font-bold">Kyle Marcus</p>
                        <p className="text-[#8E8E93]">
                            kyle@costsegauthority.com
                        </p>
                        <button
                            onClick={() => setIsLoggingOut(true)}
                            className="w-min whitespace-nowrap flex items-center gap-[12px]"
                        >
                            <p className="text-primary">Log Out</p>
                            {isLoggingOut && (
                                <Spinner className="w-[40px] h-[40px]" />
                            )}
                        </button>
                    </div>
                </section>
                <section className="w-full flex items-center justify-between">
                    <div>
                        <Button
                            value="Terms of Use"
                            iconPosition="right"
                            className="bg-transparent hover:bg-hover-secondary text-primary"
                            icon={
                                <ArrowUpIcon className="w-[18px] h-[10px] text-primary" />
                            }
                        />
                    </div>
                    <p className="whitespace-nowrap text-[#8E8E93] font-light">
                        Sitewise Version: 1.0
                    </p>
                </section>
            </div>
        </Popup>
    );
};

export default ProfilePopup;
