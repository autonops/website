'use client'

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react'
import { getUserScans, Scan } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'

// Tool icons/colors
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

export function RecentActivity() {
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
        // First get the user's API key, then fetch their scans
        const response = await fetch(`/api/user/scans`)
        if (!response.ok) {
          throw new Error('Failed to fetch scans')
        }
        const data = await response.json()
        setScans(data.scans || [])
      } catch (err) {
        console.error('[RecentActivity] Failed to fetch scans:', err)
        setError('Failed to load recent activity')
      } finally {
        setLoading(false)
      }
    }

    fetchScans()
  }, [userId])

  if (loading) {
    return (
      <Card>
        <Title>Recent Activity</Title>
        <Text>Loading...</Text>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <Title>Recent Activity</Title>
        <Text className="text-red-500">{error}</Text>
      </Card>
    )
  }

  if (scans.length === 0) {
    return (
      <Card>
        <Title>Recent Activity</Title>
        <Text className="text-gray-500 mt-4">
          No scans yet. Run your first scan with the CLI:
        </Text>
        <pre className="mt-2 p-3 bg-gray-800 rounded text-sm text-gray-300 overflow-x-auto">
          infraiq verify scan aws --sync
        </pre>
      </Card>
    )
  }

  return (
    <Card>
      <Title>Recent Activity</Title>
      <Text>Your latest scans across all tools.</Text>
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
    </Card>
  )
}
