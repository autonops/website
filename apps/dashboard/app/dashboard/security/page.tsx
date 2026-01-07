'use client'

import { Card, Title, Text, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, DonutChart } from '@tremor/react'
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

interface SecurityIssue {
  id: string
  scan_id: string
  resource_type: string
  resource_id: string
  issue: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  remediation: string
  created_at: string
}

interface SecurityStats {
  critical: number
  high: number
  medium: number
  low: number
  total: number
  score: number
  grade: string
}

const severityColors: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
}

export default function SecurityPage() {
  const [issues, setIssues] = useState<SecurityIssue[]>([])
  const [stats, setStats] = useState<SecurityStats>({
    critical: 0, high: 0, medium: 0, low: 0, total: 0, score: 100, grade: 'A'
  })
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()
  const searchParams = useSearchParams()
  const severityFilter = searchParams.get('severity')

  useEffect(() => {
    async function fetchSecurityData() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/scans')
        if (response.ok) {
          const data = await response.json()
          
          // Aggregate issues from all scans
          const allIssues: SecurityIssue[] = []
          let critical = 0, high = 0, medium = 0, low = 0
          
          for (const scan of data.scans || []) {
            for (const finding of scan.findings || []) {
              allIssues.push({
                id: finding.id,
                scan_id: scan.id,
                resource_type: finding.resource_type,
                resource_id: finding.resource_id,
                issue: finding.issue,
                severity: finding.severity,
                remediation: finding.remediation,
                created_at: scan.created_at,
              })
              
              if (finding.severity === 'critical') critical++
              else if (finding.severity === 'high') high++
              else if (finding.severity === 'medium') medium++
              else if (finding.severity === 'low') low++
            }
          }
          
          // Calculate score (simple formula)
          const total = critical + high + medium + low
          const weightedScore = Math.max(0, 100 - (critical * 20 + high * 10 + medium * 5 + low * 2))
          const grade = weightedScore >= 90 ? 'A' : weightedScore >= 80 ? 'B+' : weightedScore >= 70 ? 'B' : weightedScore >= 60 ? 'C' : 'D'
          
          setStats({ critical, high, medium, low, total, score: weightedScore, grade })
          
          // Filter issues if severity param is present
          if (severityFilter) {
            setIssues(allIssues.filter(i => i.severity === severityFilter))
          } else {
            setIssues(allIssues)
          }
        }
      } catch (err) {
        console.error('Failed to fetch security data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSecurityData()
  }, [userId, severityFilter])

  const chartData = [
    { name: 'Critical', value: stats.critical },
    { name: 'High', value: stats.high },
    { name: 'Medium', value: stats.medium },
    { name: 'Low', value: stats.low },
  ].filter(d => d.value > 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[--text]">Security Overview</h1>
        <p className="text-[--text-light] mt-1">
          Security issues found across your infrastructure scans.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card decoration="top" decorationColor="blue">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <Text>Security Score</Text>
              <p className="text-2xl font-bold">{stats.grade} ({stats.score}%)</p>
            </div>
          </div>
        </Card>
        
        <Card decoration="top" decorationColor="red">
          <Text>Critical</Text>
          <p className="text-2xl font-bold text-red-500">{stats.critical}</p>
        </Card>
        
        <Card decoration="top" decorationColor="orange">
          <Text>High</Text>
          <p className="text-2xl font-bold text-orange-500">{stats.high}</p>
        </Card>
        
        <Card decoration="top" decorationColor="yellow">
          <Text>Medium</Text>
          <p className="text-2xl font-bold text-yellow-500">{stats.medium}</p>
        </Card>
        
        <Card decoration="top" decorationColor="blue">
          <Text>Low</Text>
          <p className="text-2xl font-bold text-blue-500">{stats.low}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues Table */}
        <div className="lg:col-span-2">
          <Card>
            <Title>
              {severityFilter 
                ? `${severityFilter.charAt(0).toUpperCase() + severityFilter.slice(1)} Issues` 
                : 'All Security Issues'}
            </Title>
            
            {loading ? (
              <div className="mt-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-[--bg-alt] rounded animate-pulse" />
                ))}
              </div>
            ) : issues.length === 0 ? (
              <div className="mt-6 text-center py-8 bg-[--bg-alt] rounded-lg">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <Text className="text-[--text-light]">No security issues found</Text>
                <Text className="text-[--text-light] text-sm mt-1">
                  Your infrastructure is looking secure!
                </Text>
              </div>
            ) : (
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Severity</TableHeaderCell>
                    <TableHeaderCell>Resource</TableHeaderCell>
                    <TableHeaderCell>Issue</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <Badge color={severityColors[issue.severity]}>
                          {issue.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Text className="font-mono text-sm">{issue.resource_id}</Text>
                        <Text className="text-xs text-[--text-light]">{issue.resource_type}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{issue.issue}</Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

        {/* Sidebar - Chart */}
        <div>
          <Card>
            <Title>Issues by Severity</Title>
            {stats.total > 0 ? (
              <DonutChart
                className="mt-6 h-48"
                data={chartData}
                category="value"
                index="name"
                colors={['red', 'orange', 'yellow', 'blue']}
                showLabel={true}
              />
            ) : (
              <div className="mt-6 h-48 flex items-center justify-center bg-[--bg-alt] rounded-lg">
                <Text className="text-[--text-light]">No issues to display</Text>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
