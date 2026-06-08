import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirect') || '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=no_code', requestUrl))
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    return NextResponse.redirect(new URL('/auth?error=config', requestUrl))
  }

  const cookieStore = cookies()
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Ignored when called from a context where cookies cannot be set.
        }
      },
    },
  })

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(new URL('/auth?error=exchange_failed', requestUrl))
    }
  } catch (error) {
    console.error('Error exchanging code for session:', error)
    return NextResponse.redirect(new URL('/auth?error=exchange_failed', requestUrl))
  }

  return NextResponse.redirect(new URL(redirectTo, requestUrl))
}
