/**
 * API Client for InfraIQ Backend
 */

function getApiKey(): string {
  return process.env.INFRAIQ_BACKEND_API_KEY || ''
}

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'https://api.autonops.io'
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth, ...fetchOptions } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  const apiKey = getApiKey()
  if (!skipAuth && apiKey) {
    headers['X-API-Key'] = apiKey
  }
  
  const url = `${getApiUrl()}${endpoint}`
  console.log(`[API] Fetching ${url}, hasKey: ${!!apiKey}`)
  
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

// API Functions
export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchAPI<DashboardStats>('/api/dashboard/stats')
}

export async function getRecommendations(): Promise<Recommendation[]> {
  return fetchAPI<Recommendation[]>('/api/dashboard/recommendations')
}

export async function getRecentScans(limit = 10): Promise<Scan[]> {
  const response = await fetchAPI<ScansListResponse>(`/api/scans?limit=${limit}`)
  return response.scans
}

export async function healthCheck(): Promise<{ status: string; database: string }> {
  return fetchAPI('/health', { skipAuth: true })
}
