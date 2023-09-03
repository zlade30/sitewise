import { MouseEvent } from 'react';
import { PHOTO_DETAILS_PAGE, PHOTO_DETAILS_PAGE_SLUG, PHOTO_PAGE, PHOTO_PAGE_SLUG, PROJECT_DETAILS_PAGE, PROJECT_DETAILS_PAGE_SLUG, PROJECT_PAGE, PROJECT_PAGE_SLUG } from './constants';

export const calculatePopupPosition = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const divWidth = target.offsetWidth;
    const divHeight = target.offsetHeight;
    const screenWidth = window.innerWidth;
    let chevron: 'left' | 'right' = 'left';
    let x = target.getBoundingClientRect().x + divWidth;
    let y = target.getBoundingClientRect().y + divHeight / 2;
    const popupWidth = document.getElementById('popup')?.clientWidth;

    if (x + popupWidth! > screenWidth) {
        x -= popupWidth!;
        chevron = 'right';
    } else {
        x -= divWidth!;
    }
    y += 10;
    return { x, y, chevron };
};

export const appointmentFormatDate = (date: Date) => {
    const dateFormat = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    const timeFormat = new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return `${dateFormat} - ${timeFormat}`;
};

export const formatDate = (date: Date) => {
    const dateFormat = new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    return dateFormat;
};

export const debounce = (func: Function, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getCurrentPage = (path: string, slug: string | string[]) => {
    if (path.includes('projects') && path.includes('photos') && slug[PHOTO_DETAILS_PAGE_SLUG]) return PHOTO_DETAILS_PAGE;
    if (path.includes('projects') && path.includes('photos') && slug[PHOTO_PAGE_SLUG]) return PHOTO_PAGE;
    if (path.includes('projects') && slug[PROJECT_DETAILS_PAGE_SLUG]) return PROJECT_DETAILS_PAGE;
    if (path.includes('projects') && !slug[PROJECT_PAGE_SLUG]) return PROJECT_PAGE;
}

export const getImageDimensions = (url: string | undefined): Promise<{ width: number; height: number; }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = function () {
            reject(new Error("Failed to load the image."));
        };
        img.src = url || '';
    });
}

export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}