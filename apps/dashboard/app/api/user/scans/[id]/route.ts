import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUser, fetchAPI } from '@/lib/api'

/**
 * GET /api/user/scans/[id]
 * 
 * Fetches a specific scan by ID for the current user.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const user = await getUser(userId)
    
    if (!user || !user.api_key) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Fetch the specific scan using user's API key
    const scan = await fetchAPI(`/api/scans/${params.id}`, {
      userApiKey: user.api_key,
    })
    
    return NextResponse.json(scan)
  } catch (error) {
    console.error('[API /user/scans/[id]] Error:', error)
    return NextResponse.json(
      { error: 'Scan not found' },
      { status: 404 }
    )
  }
}
