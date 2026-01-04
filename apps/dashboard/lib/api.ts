/**
 * API Client for InfraIQ Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.autonops.io'
const API_KEY = process.env.INFRAIQ_BACKEND_API_KEY || ''

interface FetchOptions extends RequestInit {
  skipAuth?: boolean
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth, ...fetchOptions } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (!skipAuth && API_KEY) {
    headers['X-API-Key'] = API_KEY
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    cache: 'no-store',
  })
  
  if (!response.ok) {
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

// API Functions
export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchAPI<DashboardStats>('/api/dashboard/stats')
}

export async function getRecommendations(): Promise<Recommendation[]> {
  return fetchAPI<Recommendation[]>('/api/dashboard/recommendations')
}

export async function getRecentScans(limit = 10): Promise<Scan[]> {
  return fetchAPI<Scan[]>(`/api/scans?limit=${limit}`)
}

export async function healthCheck(): Promise<{ status: string; database: string }> {
  return fetchAPI('/health', { skipAuth: true })
}
