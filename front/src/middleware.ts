import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('@nextauth.token')?.value;
  const sigInURL = new URL('/', request.url);

  const dashboard = new URL('/dashboard', request.url);

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    return NextResponse.redirect(sigInURL);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboard);
  }
}

export const config = {
  matcher: ['/', '/singUp', '/dashboard/:path*', '/accounts/:path*']
};
