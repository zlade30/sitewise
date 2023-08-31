import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    if (path === '/') {
        return NextResponse.redirect(new URL('/projects', request.url));
    }
}

export const config = {
    matcher: ['/']
};
