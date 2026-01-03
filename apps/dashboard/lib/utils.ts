import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  
  return formatDate(d)
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Get severity color class
 */
export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500 bg-red-500/10'
    case 'high':
      return 'text-orange-500 bg-orange-500/10'
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'low':
      return 'text-blue-500 bg-blue-500/10'
    case 'info':
      return 'text-gray-500 bg-gray-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'success':
    case 'passed':
    case 'complete':
      return 'text-green-500 bg-green-500/10'
    case 'warning':
    case 'in_progress':
    case 'pending':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'error':
    case 'failed':
      return 'text-red-500 bg-red-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}
