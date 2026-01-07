import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUser } from '@/lib/api'

/**
 * GET /api/user/profile
 * 
 * Returns the current user's profile including their tier.
 */
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const user = await getUser(userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      tier: user.tier,
      trial_ends_at: user.trial_ends_at,
      trial_days_remaining: user.trial_days_remaining,
    })
  } catch (error) {
    console.error('[API /user/profile] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
