// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password'];

// Role-based route mappings
const roleRoutes = {
  admin: ['/admin', '/dashboard', '/profile'],
  teacher: ['/teacher', '/dashboard', '/profile'],
  student: ['/student', '/dashboard', '/profile'],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies or Authorization header
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // If no token and trying to access protected route, redirect to login
  if (!token && !publicRoutes.includes(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For API routes, let the backend handle authentication
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Role-based access control would normally check the user's role from the token
  // For now, we'll just allow access to protected routes
  // In production, decode the JWT and verify role permissions
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};