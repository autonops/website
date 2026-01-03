import Link from 'next/link'
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react'
import { formatRelativeTime } from '@/lib/utils'

// Placeholder data
const scans = [
  {
    id: 'scan-001',
    provider: 'AWS',
    region: 'us-east-1',
    status: 'completed',
    resources: 308,
    issues: 48,
    critical: 2,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'scan-002',
    provider: 'AWS',
    region: 'us-west-2',
    status: 'completed',
    resources: 124,
    issues: 12,
    critical: 0,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'scan-003',
    provider: 'GCP',
    region: 'us-central1',
    status: 'completed',
    resources: 87,
    issues: 5,
    critical: 0,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <Badge color="green">Completed</Badge>
    case 'in_progress':
      return <Badge color="yellow">Running</Badge>
    case 'failed':
      return <Badge color="red">Failed</Badge>
    default:
      return <Badge color="gray">{status}</Badge>
  }
}

export async function VerifyScans() {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Provider</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Resources</TableHeaderCell>
            <TableHeaderCell>Issues</TableHeaderCell>
            <TableHeaderCell>When</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium">{scan.provider}</TableCell>
              <TableCell>{scan.region}</TableCell>
              <TableCell>{getStatusBadge(scan.status)}</TableCell>
              <TableCell>{scan.resources}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{scan.issues}</span>
                  {scan.critical > 0 && (
                    <Badge color="red">{scan.critical} critical</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-[--text-light]">
                {formatRelativeTime(scan.timestamp)}
              </TableCell>
              <TableCell>
                <Link 
                  href={`/verify/${scan.id}`}
                  className="text-[--primary] hover:underline text-sm"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {scans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[--text-light]">No scans found</p>
        </div>
      )}
    </Card>
  )
}
