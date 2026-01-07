'use client'

import { Card, Title, Text, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react'
import { ArrowLeft, Download, RefreshCw, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface Scan {
  id: string
  tool: string
  provider: string
  region: string | null
  status: string
  summary: {
    resources_scanned: number
    issues_found: number
    critical: number
    high: number
    medium: number
    low: number
  }
  findings: Array<{
    id: string
    resource_type: string
    resource_id: string
    issue: string
    severity: string
    remediation: string
  }>
  created_at: string
}

const toolColors: Record<string, string> = {
  verify: 'blue',
  codify: 'purple',
  migrate: 'orange',
  comply: 'green',
  dataiq: 'cyan',
  secureiq: 'yellow',
  tessera: 'pink',
}

const severityColors: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
}

export default function ScanDetailPage() {
  const [scan, setScan] = useState<Scan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useAuth()
  const params = useParams()
  const scanId = params.id as string

  useEffect(() => {
    async function fetchScan() {
      if (!userId || !scanId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/user/scans/${scanId}`)
        if (response.ok) {
          const data = await response.json()
          setScan(data)
        } else if (response.status === 404) {
          setError('Scan not found')
        } else {
          setError('Failed to load scan')
        }
      } catch (err) {
        console.error('Failed to fetch scan:', err)
        setError('Failed to load scan')
      } finally {
        setLoading(false)
      }
    }

    fetchScan()
  }, [userId, scanId])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 bg-[--bg-alt] rounded animate-pulse" />
        <div className="h-64 bg-[--bg-alt] rounded animate-pulse" />
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="space-y-8">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-[--text-light] hover:text-[--text]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <Card>
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <Title>{error || 'Scan not found'}</Title>
            <Text className="text-[--text-light] mt-2">
              This scan may have been deleted or you don't have access to it.
            </Text>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link 
        href="/dashboard"
        className="flex items-center gap-2 text-[--text-light] hover:text-[--text]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge color={toolColors[scan.tool] || 'gray'} size="lg">
              {scan.tool.charAt(0).toUpperCase() + scan.tool.slice(1)}IQ
            </Badge>
            <Badge>{scan.provider.toUpperCase()}</Badge>
            {scan.region && <Badge color="gray">{scan.region}</Badge>}
          </div>
          <h1 className="text-2xl font-bold text-[--text]">Scan Results</h1>
          <div className="flex items-center gap-2 mt-1 text-[--text-light]">
            <Clock className="w-4 h-4" />
            {formatDistanceToNow(new Date(scan.created_at), { addSuffix: true })}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[--bg-alt] rounded-lg hover:bg-[--border] flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Re-run Scan
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card decoration="top" decorationColor="blue">
          <Text>Resources</Text>
          <p className="text-2xl font-bold">{scan.summary.resources_scanned}</p>
        </Card>
        <Card decoration="top" decorationColor={scan.summary.issues_found > 0 ? 'red' : 'green'}>
          <Text>Issues</Text>
          <p className="text-2xl font-bold">{scan.summary.issues_found}</p>
        </Card>
        <Card decoration="top" decorationColor="red">
          <Text>Critical</Text>
          <p className="text-2xl font-bold text-red-500">{scan.summary.critical}</p>
        </Card>
        <Card decoration="top" decorationColor="orange">
          <Text>High</Text>
          <p className="text-2xl font-bold text-orange-500">{scan.summary.high}</p>
        </Card>
        <Card decoration="top" decorationColor="yellow">
          <Text>Medium</Text>
          <p className="text-2xl font-bold text-yellow-500">{scan.summary.medium}</p>
        </Card>
        <Card decoration="top" decorationColor="blue">
          <Text>Low</Text>
          <p className="text-2xl font-bold text-blue-500">{scan.summary.low}</p>
        </Card>
      </div>

      {/* Findings */}
      <Card>
        <Title>Findings</Title>
        
        {scan.findings.length === 0 ? (
          <div className="mt-6 text-center py-8 bg-[--bg-alt] rounded-lg">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <Text className="text-[--text-light]">No issues found</Text>
            <Text className="text-[--text-light] text-sm mt-1">
              Your infrastructure passed all checks!
            </Text>
          </div>
        ) : (
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Severity</TableHeaderCell>
                <TableHeaderCell>Resource</TableHeaderCell>
                <TableHeaderCell>Issue</TableHeaderCell>
                <TableHeaderCell>Remediation</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scan.findings.map((finding) => (
                <TableRow key={finding.id}>
                  <TableCell>
                    <Badge color={severityColors[finding.severity] || 'gray'}>
                      {finding.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Text className="font-mono text-sm">{finding.resource_id}</Text>
                    <Text className="text-xs text-[--text-light]">{finding.resource_type}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{finding.issue}</Text>
                  </TableCell>
                  <TableCell>
                    <Text className="text-sm text-[--text-light]">{finding.remediation}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
