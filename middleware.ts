import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    const hasCookie = request.cookies.get('user_id'); // user_id cookie값이 존재하는가?

    if(!hasCookie)
      return NextResponse.redirect(new URL('/login', request.url)); 
}

export const config = {
  matcher: ['/', '/mypage/:path*', '/detail/:path*'],
};