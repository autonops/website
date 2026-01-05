'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { upsertUser, User } from '@/lib/api'

/**
 * Hook to sync Clerk user with InfraIQ database.
 * Creates user on first sign-in, returns user data including API key.
 */
export function useUserSync() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded) return
      
      if (!isSignedIn || !clerkUser) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const email = clerkUser.primaryEmailAddress?.emailAddress
        if (!email) {
          throw new Error('No email address found')
        }

        const name = [clerkUser.firstName, clerkUser.lastName]
          .filter(Boolean)
          .join(' ') || null

        const syncedUser = await upsertUser(clerkUser.id, email, name)
        setUser(syncedUser)
      } catch (err) {
        console.error('Failed to sync user:', err)
        setError(err instanceof Error ? err.message : 'Failed to sync user')
      } finally {
        setLoading(false)
      }
    }

    syncUser()
  }, [clerkUser, isLoaded, isSignedIn])

  return {
    user,
    loading,
    error,
    isSignedIn,
    // Convenience properties
    apiKey: user?.api_key || null,
    tier: user?.tier || null,
    trialDaysRemaining: user?.trial_days_remaining || 0,
  }
}
