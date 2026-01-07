'use client'

import { Card, Title, Text, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react'
import { Terminal, ExternalLink, Clock } from 'lucide-react'
import Link from 'next/link'
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

interface ToolPageContentProps {
  toolId: string
  toolName: string
  toolDescription: string
  toolFeatures: string[]
  cliCommands: string[]
  docsUrl?: string
}

const statusColors: Record<string, string> = {
  completed: 'green',
  running: 'blue',
  failed: 'red',
  pending: 'gray',
}

export function ToolPageContent({
  toolId,
  toolName,
  toolDescription,
  toolFeatures,
  cliCommands,
  docsUrl,
}: ToolPageContentProps) {
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchScans() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/user/scans?tool=${toolId}`)
        if (response.ok) {
          const data = await response.json()
          // Filter scans for this tool
          const toolScans = (data.scans || []).filter((s: Scan) => s.tool === toolId)
          setScans(toolScans)
        }
      } catch (err) {
        console.error('Failed to fetch scans:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchScans()
  }, [userId, toolId])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">{toolName}</h1>
          <p className="text-[--text-light] mt-1 max-w-2xl">
            {toolDescription}
          </p>
        </div>
        {docsUrl && (
          <Link 
            href={docsUrl} 
            target="_blank"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
          >
            Documentation <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Recent Scans */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Title>Recent Scans</Title>
            <Text>Your latest {toolName} scans</Text>
            
            {loading ? (
              <div className="mt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-[--bg-alt] rounded animate-pulse" />
                ))}
              </div>
            ) : scans.length === 0 ? (
              <div className="mt-6 text-center py-8 bg-[--bg-alt] rounded-lg">
                <Clock className="w-12 h-12 text-[--text-light] mx-auto mb-4" />
                <Text className="text-[--text-light]">No scans yet</Text>
                <Text className="text-[--text-light] text-sm mt-1">
                  Run your first scan using the CLI commands below
                </Text>
              </div>
            ) : (
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Provider</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Resources</TableHeaderCell>
                    <TableHeaderCell>Issues</TableHeaderCell>
                    <TableHeaderCell>When</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scans.map((scan) => (
                    <TableRow key={scan.id} className="cursor-pointer hover:bg-[--bg-alt]">
                      <TableCell>{scan.provider}</TableCell>
                      <TableCell>
                        <Badge color={statusColors[scan.status] || 'gray'}>
                          {scan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{scan.summary?.resources_scanned || 0}</TableCell>
                      <TableCell>
                        <span className={scan.summary?.issues_found > 0 ? 'text-red-500' : ''}>
                          {scan.summary?.issues_found || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(scan.created_at), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Start */}
          <Card>
            <Title className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Quick Start
            </Title>
            <Text className="mb-4">Run these commands to get started:</Text>
            <div className="space-y-3">
              {cliCommands.map((cmd, index) => (
                <pre 
                  key={index}
                  className="p-3 bg-[--bg-alt] rounded text-sm text-[--text-light] overflow-x-auto"
                >
                  {cmd}
                </pre>
              ))}
            </div>
          </Card>

          {/* Features */}
          <Card>
            <Title>Features</Title>
            <ul className="mt-4 space-y-3">
              {toolFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-[--text-light]">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
