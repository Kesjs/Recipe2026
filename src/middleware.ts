import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_PATHS = ['/dashboard', '/recettes/creer']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env not configured, just let the request through (auth pages will show their own error)
  if (!supabaseUrl || !supabaseAnonKey) {
    return res
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = req.nextUrl

  // Protect specific routes — redirige vers /auth si non connecté
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (isProtected && !user) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Ne pas rediriger automatiquement les connectés sur /auth
  // La page auth gère elle-même la redirection post-login côté client
  // pour éviter les boucles dues au timing des cookies SSR

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/recettes/creer/:path*', '/auth/:path*'],
}
