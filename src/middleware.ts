import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_PATHS = ['/dashboard', '/recettes/creer']
const AUTH_PATHS = ['/auth']

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env not configured, just let the request through
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Middleware] Supabase env variables not configured')
    return res
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookies = req.cookies.getAll()
        console.log('[Middleware] Cookies available:', cookies.map(c => c.name))
        return cookies
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          req.cookies.set(name, value)
        })

        res = NextResponse.next({ request: req })

        cookiesToSet.forEach(({ name, value, options }) => {
          console.log(`[Middleware] Setting cookie: ${name}`)
          res.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log(`[Middleware] User check on ${req.nextUrl.pathname}:`, user ? `✓ ${user.email}` : '✗ No user', error?.message)

  const { pathname } = req.nextUrl

  // Protect specific routes — redirige vers /auth si non connecté
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (isProtected && !user) {
    console.log(`[Middleware] Redirecting to /auth from ${pathname}`)
    const url = req.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Si utilisateur EST connecté et tente d'accéder à /auth
  // → le laisser (client-side gère la redirection via useEffect)
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p))
  if (isAuthPage && user) {
    console.log(`[Middleware] User connected on auth page, allowing (client will redirect)`)
    return res
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/recettes/creer/:path*', '/auth/:path*'],
}