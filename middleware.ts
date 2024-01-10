import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { loggedInUser } from '@/app/apis';


export function middleware(request: NextRequest) {

  const { accessToken = null, expiredAt = null } = loggedInUser() || {};


  //protect all routes
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // expired token
  if (accessToken && new Date(expiredAt) < new Date()) {
    //TODO: impliment logic for refresh token
    request.cookies.delete('user');
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();

}

export const config = {
  matcher: ['/dashboard/:path*', '/campaigns/:path*', '/leads/:path*', '/users/:path*'],
}