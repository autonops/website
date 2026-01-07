'use client'

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'

interface Scan {
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

// Tool colors
const toolColors: Record<string, string> = {
  verify: 'blue',
  codify: 'purple',
  migrate: 'orange',
  comply: 'green',
  dataiq: 'cyan',
  secureiq: 'yellow',
  tessera: 'pink',
}

const statusColors: Record<string, string> = {
  completed: 'green',
  running: 'blue',
  failed: 'red',
  pending: 'gray',
}

export function RecentScans() {
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchScans() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        // Fetch user's scans through our API route
        const response = await fetch('/api/user/scans')
        if (!response.ok) {
          throw new Error('Failed to fetch scans')
        }
        const data = await response.json()
        setScans(data.scans || [])
      } catch (err) {
        console.error('[RecentScans] Failed to fetch scans:', err)
        setError('Failed to load recent activity')
      } finally {
        setLoading(false)
      }
    }

    fetchScans()
  }, [userId])

  if (loading) {
    return (
      <div className="mt-4 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-[--bg-alt] rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-red-500 mt-4">{error}</p>
    )
  }

  if (scans.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-[--text-light]">
          No scans yet. Run your first scan with the CLI:
        </p>
        <pre className="mt-2 p-3 bg-[--bg-alt] rounded text-sm text-[--text-light] overflow-x-auto">
          infraiq verify scan aws --sync
        </pre>
      </div>
    )
  }

  return (
    <Table className="mt-4">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Tool</TableHeaderCell>
          <TableHeaderCell>Provider</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Issues</TableHeaderCell>
          <TableHeaderCell>When</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scans.map((scan) => (
          <TableRow key={scan.id}>
            <TableCell>
              <Badge color={toolColors[scan.tool] || 'gray'}>
                {scan.tool.charAt(0).toUpperCase() + scan.tool.slice(1)}IQ
              </Badge>
            </TableCell>
            <TableCell>{scan.provider}</TableCell>
            <TableCell>
              <Badge color={statusColors[scan.status] || 'gray'}>
                {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {scan.summary?.issues_found || 0} Issues
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(scan.created_at), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
