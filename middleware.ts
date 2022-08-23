import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  // const response = NextResponse.next();

  const { pathname } = request.nextUrl;
  console.log(`pathname: ${pathname}`);

  const cookie = request.headers.get('cookie');
  console.log(`cookie: ${cookie}`);

  const token = cookie?.split('=')[1];
  if (!token) return NextResponse.redirect(new URL('/accounts/login', request.nextUrl.origin)); 


  return NextResponse.next();
};
  
export const config = {
  matcher: [
    '/',
    '/quizzes/:path*',
    '/quiz/:path*',
    '/accounts/account',
    '/create/:path*',
    '/subjects/:path*',
    '/api/quizzes/:path*',
    '/api/quiz/:path*',
    '/api/subjects/:path*',
  ]
};