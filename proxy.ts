import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const isMaintenancePath = request.nextUrl.pathname === '/maintenance';

  // If maintenance mode is on and not already on maintenance page
  if (isMaintenanceMode && !isMaintenancePath) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // If maintenance mode is off and user is on maintenance page, redirect to home
  if (!isMaintenanceMode && isMaintenancePath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon|.*\\..*|public).*)',
  ],
};
