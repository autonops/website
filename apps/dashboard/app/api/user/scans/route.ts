import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUser, getUserScans } from '@/lib/api'

/**
 * GET /api/user/scans
 * 
 * Fetches the current user's scans using their personal API key.
 * This ensures each user only sees their own data.
 */
export async function GET(request: Request) {
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
    
    // Parse query params for limit
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    
    // Fetch scans using the user's personal API key
    const scans = await getUserScans(user.api_key, limit)
    
    return NextResponse.json({ scans })
  } catch (error) {
    console.error('[API /user/scans] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
      { status: 500 }
    )
  }
}
