import Link from 'next/link'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatRelativeTime } from '@/lib/utils'
import { getRecentScans, Scan } from '@/lib/api'

const toolConfig: Record<string, { emoji: string; displayName: string }> = {
  verify: { emoji: '🔍', displayName: 'VerifyIQ' },
  migrate: { emoji: '🚀', displayName: 'MigrateIQ' },
  codify: { emoji: '📝', displayName: 'CodifyIQ' },
  comply: { emoji: '🔒', displayName: 'ComplyIQ' },
  dataiq: { emoji: '🗄️', displayName: 'DataIQ' },
  secureiq: { emoji: '🔑', displayName: 'SecureIQ' },
  tessera: { emoji: '🎭', displayName: 'Tessera' },
}

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
  let scans: Scan[] = []
  
  try {
    scans = await getRecentScans(5)
  } catch (error) {
    console.error('Failed to fetch recent scans:', error)
  }
  
  if (scans.length === 0) {
    return (
      <div className="mt-4 py-8 text-center text-[--text-light]">
        <p>No scans yet.</p>
        <p className="text-sm mt-2">
          Run <code className="bg-[--bg-alt] px-2 py-1 rounded">infraiq verify scan --provider aws</code> to get started.
        </p>
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
        {scans.map((scan) => {
          const config = toolConfig[scan.tool] || { emoji: '🔧', displayName: scan.tool }
          const issues = scan.summary?.issues_found || 0
          const critical = scan.summary?.critical || 0
          
          return (
            <TableRow key={scan.id}>
              <TableCell>
                <Link 
                  href={`/dashboard/${scan.tool}/${scan.id}`}
                  className="flex items-center gap-2 hover:text-[--primary]"
                >
                  <span>{config.emoji}</span>
                  <span className="font-medium">{config.displayName}</span>
                </Link>
              </TableCell>
              <TableCell>{scan.provider}</TableCell>
              <TableCell>{getStatusBadge(scan.status)}</TableCell>
              <TableCell>
                {issues > 0 ? (
                  <div className="flex items-center gap-2">
                    <span>{issues} issues</span>
                    {critical > 0 && (
                      <Badge color="red">{critical} critical</Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-[--text-light]">—</span>
                )}
              </TableCell>
              <TableCell className="text-[--text-light]">
                {formatRelativeTime(new Date(scan.created_at))}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
