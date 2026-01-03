/**
 * API Client for InfraIQ Backend
 * 
 * Handles all communication with api.autonops.io
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(
      data?.message || `API Error: ${response.status}`,
      response.status,
      data
    )
  }
  
  return response.json()
}

/**
 * Scans API
 */
export const scansApi = {
  /**
   * List all scans for the current user
   */
  list: async (params?: { tool?: string; limit?: number; offset?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.tool) searchParams.set('tool', params.tool)
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.offset) searchParams.set('offset', params.offset.toString())
    
    const query = searchParams.toString()
    return fetchApi<ScanListResponse>(`/api/scans${query ? `?${query}` : ''}`)
  },
  
  /**
   * Get a single scan by ID
   */
  get: async (id: string) => {
    return fetchApi<Scan>(`/api/scans/${id}`)
  },
  
  /**
   * Delete a scan
   */
  delete: async (id: string) => {
    return fetchApi<void>(`/api/scans/${id}`, { method: 'DELETE' })
  },
}

/**
 * Projects API
 */
export const projectsApi = {
  /**
   * List all projects
   */
  list: async () => {
    return fetchApi<Project[]>('/api/projects')
  },
  
  /**
   * Create a new project
   */
  create: async (data: CreateProjectRequest) => {
    return fetchApi<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  /**
   * Get a project by ID
   */
  get: async (id: string) => {
    return fetchApi<Project>(`/api/projects/${id}`)
  },
  
  /**
   * Update a project
   */
  update: async (id: string, data: UpdateProjectRequest) => {
    return fetchApi<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  
  /**
   * Delete a project
   */
  delete: async (id: string) => {
    return fetchApi<void>(`/api/projects/${id}`, { method: 'DELETE' })
  },
}

/**
 * License API
 */
export const licenseApi = {
  /**
   * Get current license status
   */
  status: async () => {
    return fetchApi<LicenseStatus>('/api/license/status')
  },
  
  /**
   * Validate a license key
   */
  validate: async (key: string) => {
    return fetchApi<LicenseValidation>('/api/license/validate', {
      method: 'POST',
      body: JSON.stringify({ key }),
    })
  },
}

/**
 * Dashboard API
 */
export const dashboardApi = {
  /**
   * Get dashboard stats
   */
  stats: async () => {
    return fetchApi<DashboardStats>('/api/dashboard/stats')
  },
  
  /**
   * Get recommended actions
   */
  recommendations: async () => {
    return fetchApi<Recommendation[]>('/api/dashboard/recommendations')
  },
}

// =============================================================================
// Types
// =============================================================================

export interface Scan {
  id: string
  tool: 'verify' | 'migrate' | 'codify' | 'comply' | 'dataiq' | 'secureiq' | 'tessera'
  provider: string
  region?: string
  status: 'completed' | 'failed' | 'in_progress'
  summary: {
    resources_scanned: number
    issues_found: number
    critical: number
    high: number
    medium: number
    low: number
  }
  findings: Finding[]
  created_at: string
  updated_at: string
}

export interface Finding {
  id: string
  resource_type: string
  resource_id: string
  issue: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  remediation: string
}

export interface ScanListResponse {
  scans: Scan[]
  total: number
  limit: number
  offset: number
}

export interface Project {
  id: string
  name: string
  description?: string
  scans: string[] // Scan IDs
  created_at: string
  updated_at: string
}

export interface CreateProjectRequest {
  name: string
  description?: string
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
}

export interface LicenseStatus {
  tier: 'trial' | 'pro' | 'team' | 'enterprise'
  status: 'active' | 'expired' | 'cancelled'
  tools_enabled: string[]
  trial_days_remaining?: number
  runs_today?: number
  runs_limit?: number
  valid_until?: string
}

export interface LicenseValidation {
  valid: boolean
  tier?: string
  message?: string
}

export interface DashboardStats {
  resources_monitored: number
  security_score: number
  security_grade: string
  compliance_status: {
    framework: string
    status: 'compliant' | 'non_compliant' | 'partial'
  }[]
  active_migrations: number
  scans_this_week: number
  issues_resolved: number
}

export interface Recommendation {
  id: string
  type: 'security' | 'compliance' | 'migration' | 'optimization'
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  tool: string
  action_url: string
}
