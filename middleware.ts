import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    let hasSession;
    if(typeof window !== 'undefined'){
      hasSession = sessionStorage.getItem('user_id');
    }
    if(hasSession === null) // session이 없는 경우 login으로 이동
        return NextResponse.redirect(new URL('/login', request.url)); 
}

export const config = {
  matcher: ['/', '/mypage/:path*', '/detail/:path*'],
};