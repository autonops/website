import { auth } from '@clerk/nextjs/server'
import { getUser, User } from './api'

/**
 * Get the current user's data from the backend.
 * This uses the Clerk session to identify the user, then fetches
 * their full profile including their personal API key.
 * 
 * @returns User object with api_key, or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }
  
  try {
    const user = await getUser(userId)
    return user
  } catch (error) {
    console.error('[getCurrentUser] Failed to fetch user:', error)
    return null
  }
}

/**
 * Get the current user's personal API key.
 * This is the iq_xxx key that should be used for user-specific API calls.
 * 
 * @returns API key string, or null if not authenticated
 */
export async function getCurrentUserApiKey(): Promise<string | null> {
  const user = await getCurrentUser()
  return user?.api_key || null
}
