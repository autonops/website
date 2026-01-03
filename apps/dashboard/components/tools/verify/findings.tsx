'use client'

import { useState } from 'react'
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, TextInput, Select, SelectItem } from '@tremor/react'
import { Search, Filter } from 'lucide-react'

// Placeholder data
const findings = [
  {
    id: 'finding-001',
    resourceType: 'S3 Bucket',
    resourceId: 'my-app-uploads',
    issue: 'Public access enabled',
    severity: 'critical',
    remediation: 'Disable public access in bucket settings',
  },
  {
    id: 'finding-002',
    resourceType: 'Security Group',
    resourceId: 'sg-0abc123def456',
    issue: 'SSH open to 0.0.0.0/0',
    severity: 'critical',
    remediation: 'Restrict SSH access to specific IP ranges',
  },
  {
    id: 'finding-003',
    resourceType: 'IAM User',
    resourceId: 'deploy-user',
    issue: 'Access keys older than 90 days',
    severity: 'high',
    remediation: 'Rotate access keys regularly',
  },
  {
    id: 'finding-004',
    resourceType: 'RDS Instance',
    resourceId: 'prod-database',
    issue: 'No encryption at rest',
    severity: 'high',
    remediation: 'Enable encryption for RDS instance',
  },
  {
    id: 'finding-005',
    resourceType: 'EC2 Instance',
    resourceId: 'i-0123456789abcdef0',
    issue: 'IMDSv1 enabled',
    severity: 'medium',
    remediation: 'Require IMDSv2 for instance metadata',
  },
]

function getSeverityBadge(severity: string) {
  const colors: Record<string, 'red' | 'orange' | 'yellow' | 'blue' | 'gray'> = {
    critical: 'red',
    high: 'orange',
    medium: 'yellow',
    low: 'blue',
    info: 'gray',
  }
  return <Badge color={colors[severity] || 'gray'}>{severity}</Badge>
}

export function VerifyFindings() {
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  
  const filteredFindings = findings.filter((finding) => {
    const matchesSearch = 
      finding.resourceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.issue.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = 
      severityFilter === 'all' || finding.severity === severityFilter
    
    return matchesSearch && matchesSeverity
  })
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              icon={Search}
              placeholder="Search findings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={severityFilter}
              onValueChange={setSeverityFilter}
              icon={Filter}
            >
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </Select>
          </div>
        </div>
      </Card>
      
      {/* Findings Table */}
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Severity</TableHeaderCell>
              <TableHeaderCell>Resource</TableHeaderCell>
              <TableHeaderCell>Issue</TableHeaderCell>
              <TableHeaderCell>Remediation</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFindings.map((finding) => (
              <TableRow key={finding.id}>
                <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{finding.resourceType}</p>
                    <p className="text-xs text-[--text-light] font-mono">
                      {finding.resourceId}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{finding.issue}</TableCell>
                <TableCell className="text-sm text-[--text-light]">
                  {finding.remediation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredFindings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[--text-light]">No findings match your filters</p>
          </div>
        )}
      </Card>
    </div>
  )
}
