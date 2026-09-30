import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated (from auth store or session)
  // Note: This is a simplified version. In production, use proper session/JWT validation
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!authToken;

  // Protected dashboard routes
  const protectedRoutes = ['/dashboard', '/projects', '/analytics', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Public auth routes
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access auth routes while authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
