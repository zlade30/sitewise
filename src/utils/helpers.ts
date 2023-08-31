import { MouseEvent } from 'react';
import { PHOTO_DETAILS_PAGE, PHOTO_DETAILS_PAGE_SLUG, PHOTO_PAGE_SLUG, PROJECT_DETAILS_PAGE, PROJECT_DETAILS_PAGE_SLUG, PROJECT_PAGE, PROJECT_PAGE_SLUG } from './constants';

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

export const centralizedFetch = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    options?: Object,
    body?: any,
    headers?: HeadersInit
) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body,
            ...options
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                error: response.statusText
            };
        }

        return await response.json();
    } catch (error: any) {
        // Handle other errors
        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    }
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

export const onFilter = ({
    paramsEntries,
    value,
    params
}: {
    paramsEntries: IterableIterator<[string, string]>;
    value: string;
    params: string;
}) => {
    const current = new URLSearchParams(Array.from(paramsEntries));

    if (!value) {
        current.delete(params);
    } else {
        current.set(params, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    return query;
};

export const getCurrentPage = (path: string, slug: string | string[]) => {
    if (path.includes('projects') && path.includes('photos') && slug[PHOTO_DETAILS_PAGE_SLUG]) return PHOTO_DETAILS_PAGE;
    if (path.includes('projects') && path.includes('photos') && slug[PHOTO_PAGE_SLUG]) return PHOTO_PAGE_SLUG;
    if (path.includes('projects') && slug[PROJECT_DETAILS_PAGE_SLUG]) return PROJECT_DETAILS_PAGE;
    if (path.includes('projects') && !slug[PROJECT_PAGE_SLUG]) return PROJECT_PAGE;
}