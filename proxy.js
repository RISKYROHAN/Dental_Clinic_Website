import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_for_development');

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Protect /admin routes (but allow /admin itself for login)
  const isDashboardRoute = pathname.startsWith('/admin/dashboard');
  const isAdminApiRoute = pathname.startsWith('/api/admin') && !pathname.includes('/login') && !pathname.includes('/setup');
  
  if (isDashboardRoute || isAdminApiRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Prevent logged in users from seeing login page
  if (pathname === '/admin') {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        // Valid token, redirect to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (error) {
        // allow pass through
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
