import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Get the session token from cookies
  const sessionToken = req.cookies.get('sb-access-token')?.value || 
                      req.cookies.get('sb:token')?.value

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
  }

  // Redirect authenticated users from auth pages to dashboard (except reset-password and update-password)
  if (req.nextUrl.pathname.startsWith('/auth') && sessionToken && 
      !req.nextUrl.pathname.includes('/reset-password') && 
      !req.nextUrl.pathname.includes('/update-password')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
