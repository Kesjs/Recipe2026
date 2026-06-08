import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true;
    
    async function getUser() {
      try {
        const { supabase } = await import('@/lib/supabase')
        if (!supabase) {
          setLoading(false)
          return
        }
        
        const { data: { user } } = await supabase.auth.getUser()
        if (mounted) setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    getUser()
    
    return () => { mounted = false }
  }, [])

  return { user, loading }
}
