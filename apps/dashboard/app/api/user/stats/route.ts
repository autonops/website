import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUser, getUserDashboardStats } from '@/lib/api'

/**
 * GET /api/user/stats
 * 
 * Fetches the current user's dashboard stats using their personal API key.
 * This ensures each user only sees their own data.
 */
export async function GET() {
  try {
    // Get the current user's Clerk ID from the session
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Fetch the user's profile to get their personal API key
    const user = await getUser(userId)
    
    if (!user || !user.api_key) {
      return NextResponse.json(
        { error: 'User not found or no API key' },
        { status: 404 }
      )
    }
    
    // Fetch stats using the user's personal API key
    const stats = await getUserDashboardStats(user.api_key)
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('[API /user/stats] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
