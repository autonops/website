/**
 * API Client for InfraIQ Backend
 * 
 * This client supports two modes:
 * 1. Admin mode: Uses INFRAIQ_BACKEND_API_KEY for admin operations
 * 2. User mode: Uses the user's personal iq_xxx key for user-specific data
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.autonops.io'
const ADMIN_API_KEY = process.env.INFRAIQ_BACKEND_API_KEY || ''

interface FetchOptions extends RequestInit {
  skipAuth?: boolean
  userApiKey?: string  // Pass user's personal key for user-specific requests
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth, userApiKey, ...fetchOptions } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  // Use user's key if provided, otherwise fall back to admin key
  const apiKey = userApiKey || ADMIN_API_KEY
  if (!skipAuth && apiKey) {
    headers['X-API-Key'] = apiKey
  }
  
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    cache: 'no-store',
  })
  
  if (!response.ok) {
    const text = await response.text()
    console.error(`[API] Error ${response.status}: ${text}`)
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

// Types
export interface DashboardStats {
  resources_monitored: number
  security_score: number
  security_grade: string
  compliance_status: { framework: string; status: string }[]
  active_migrations: number
  scans_this_week: number
  issues_resolved: number
}

export interface Recommendation {
  id: string
  type: string
  title: string
  description: string
  severity: string
  tool: string
  action_url: string
}

export interface Scan {
  id: string
  tool: string
  provider: string
  status: string
  summary: {
    resources_scanned: number
    issues_found: number
    critical: number
    high: number
    medium: number
    low: number
  }
  created_at: string
}

interface ScansListResponse {
  scans: Scan[]
  total: number
  limit: number
  offset: number
}

export interface User {
  id: string
  clerk_id: string
  email: string
  name: string | null
  api_key: string
  tier: string
  trial_started_at: string | null
  trial_ends_at: string | null
  trial_days_remaining: number
  created_at: string
}

export interface UserStats {
  scans_today: number
  scans_this_month: number
  scans_total: number
}

// ============================================
// Admin API Functions (use shared admin key)
// ============================================

export async function getUser(clerkId: string): Promise<User> {
  return fetchAPI<User>(`/api/users/me?clerk_id=${clerkId}`)
}

export async function upsertUser(clerkId: string, email: string, name?: string): Promise<User> {
  return fetchAPI<User>('/api/users/me', {
    method: 'POST',
    body: JSON.stringify({ clerk_id: clerkId, email, name }),
  })
}

// ============================================
// User-specific API Functions (use user's key)
// ============================================

export async function getUserDashboardStats(userApiKey: string): Promise<DashboardStats> {
  return fetchAPI<DashboardStats>('/api/dashboard/stats', { userApiKey })
}

export async function getUserRecommendations(userApiKey: string): Promise<Recommendation[]> {
  return fetchAPI<Recommendation[]>('/api/dashboard/recommendations', { userApiKey })
}

export async function getUserScans(userApiKey: string, limit = 10): Promise<Scan[]> {
  const response = await fetchAPI<ScansListResponse>(`/api/scans?limit=${limit}`, { userApiKey })
  return response.scans
}

export async function getUserStats(clerkId: string): Promise<UserStats> {
  return fetchAPI<UserStats>(`/api/users/me/stats?clerk_id=${clerkId}`)
}

export async function healthCheck(): Promise<{ status: string; database: string }> {
  return fetchAPI('/health', { skipAuth: true })
}
