import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton instance — one client shared across the whole browser session.
// Creating multiple clients causes auth-lock contention ("Lock was released
// because another request stole it") and intermittent fetch failures.
let browserClient: SupabaseClient | undefined

const DEFAULT_SUPABASE_URL = 'https://obbbhgoucjamuwmiiknz.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmJoZ291Y2phbXV3bWlpa256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NDc1NTgsImV4cCI6MjEwNDUyMzU1OH0.q56mj4VIBHkhzp2D5-Ux9HnnTXoGAP3LwF8wvSq2Vwg'

export function createClient() {
  if (browserClient) return browserClient

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

  browserClient = createBrowserClient(url, key)

  return browserClient
}
