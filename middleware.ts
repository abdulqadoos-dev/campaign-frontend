import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { AUTH_ROUTES } from '@/app/constants'

export function middleware(request: NextRequest) {

  let user = request.cookies.get('user');

  if (!AUTH_ROUTES.includes(request.nextUrl.pathname) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (AUTH_ROUTES.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

}

export const config = {
  matcher: ['/login/:path*', '/dashboard/:path*', '/campaigns/:path*', '/leads/:path*', '/users/:path*'],
}