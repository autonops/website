import Link from 'next/link'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatRelativeTime, getSeverityColor } from '@/lib/utils'

// Placeholder data - would come from API
const recentScans = [
  {
    id: '1',
    tool: 'VerifyIQ',
    toolEmoji: '🔍',
    provider: 'AWS',
    status: 'completed',
    issues: 12,
    critical: 2,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    tool: 'MigrateIQ',
    toolEmoji: '🚀',
    provider: 'Heroku → AWS',
    status: 'in_progress',
    issues: 0,
    critical: 0,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '3',
    tool: 'ComplyIQ',
    toolEmoji: '🔒',
    provider: 'AWS',
    status: 'completed',
    issues: 3,
    critical: 0,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '4',
    tool: 'SecureIQ',
    toolEmoji: '🔑',
    provider: 'Heroku',
    status: 'completed',
    issues: 47,
    critical: 5,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '5',
    tool: 'Tessera',
    toolEmoji: '🎭',
    provider: 'Local',
    status: 'completed',
    issues: 0,
    critical: 0,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <Badge color="green">Completed</Badge>
    case 'in_progress':
      return <Badge color="yellow">In Progress</Badge>
    case 'failed':
      return <Badge color="red">Failed</Badge>
    default:
      return <Badge color="gray">{status}</Badge>
  }
}

export async function RecentScans() {
  // In a real app, fetch data here:
  // const { scans } = await scansApi.list({ limit: 5 })
  
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
        {recentScans.map((scan) => (
          <TableRow key={scan.id}>
            <TableCell>
              <Link 
                href={`/${scan.tool.toLowerCase().replace('iq', '')}`}
                className="flex items-center gap-2 hover:text-[--primary]"
              >
                <span>{scan.toolEmoji}</span>
                <span className="font-medium">{scan.tool}</span>
              </Link>
            </TableCell>
            <TableCell>{scan.provider}</TableCell>
            <TableCell>{getStatusBadge(scan.status)}</TableCell>
            <TableCell>
              {scan.issues > 0 ? (
                <div className="flex items-center gap-2">
                  <span>{scan.issues} issues</span>
                  {scan.critical > 0 && (
                    <Badge color="red">{scan.critical} critical</Badge>
                  )}
                </div>
              ) : (
                <span className="text-[--text-light]">—</span>
              )}
            </TableCell>
            <TableCell className="text-[--text-light]">
              {formatRelativeTime(scan.timestamp)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
