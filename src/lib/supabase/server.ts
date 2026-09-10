import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const DEFAULT_SUPABASE_URL = 'https://obbbhgoucjamuwmiiknz.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmJoZ291Y2phbXV3bWlpa256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NDc1NTgsImV4cCI6MjEwNDUyMzU1OH0.q56mj4VIBHkhzp2D5-Ux9HnnTXoGAP3LwF8wvSq2Vwg'

export async function createClient() {
  const cookieStore = await cookies()

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const url =
    envUrl && !envUrl.includes('placeholder')
      ? envUrl
      : DEFAULT_SUPABASE_URL
  const key =
    envKey && !envKey.includes('placeholder')
      ? envKey
      : DEFAULT_SUPABASE_ANON_KEY

  return createServerClient(
    url,
    key,
    {
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
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}
