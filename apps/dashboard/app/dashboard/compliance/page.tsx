'use client'

import { Card, Title, Text, Badge, ProgressBar } from '@tremor/react'
import { CheckCircle, Clock, AlertCircle, FileText, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

interface ComplianceFramework {
  id: string
  name: string
  status: 'compliant' | 'in_progress' | 'not_started'
  progress: number
  controlsPassed: number
  controlsTotal: number
  lastAudit: string | null
  nextAudit: string | null
}

const statusConfig = {
  compliant: { color: 'green', icon: CheckCircle, label: 'Compliant' },
  in_progress: { color: 'yellow', icon: Clock, label: 'In Progress' },
  not_started: { color: 'gray', icon: AlertCircle, label: 'Not Started' },
}

export default function CompliancePage() {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchComplianceData() {
      if (!userId) {
        setLoading(false)
        return
      }

      // For now, return mock data since compliance tracking 
      // would need its own backend endpoints
      setFrameworks([
        {
          id: 'soc2',
          name: 'SOC 2 Type II',
          status: 'in_progress',
          progress: 65,
          controlsPassed: 52,
          controlsTotal: 80,
          lastAudit: null,
          nextAudit: '2026-03-15',
        },
        {
          id: 'iso27001',
          name: 'ISO 27001',
          status: 'not_started',
          progress: 0,
          controlsPassed: 0,
          controlsTotal: 114,
          lastAudit: null,
          nextAudit: null,
        },
        {
          id: 'hipaa',
          name: 'HIPAA',
          status: 'not_started',
          progress: 0,
          controlsPassed: 0,
          controlsTotal: 45,
          lastAudit: null,
          nextAudit: null,
        },
      ])
      setLoading(false)
    }

    fetchComplianceData()
  }, [userId])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">Compliance Status</h1>
          <p className="text-[--text-light] mt-1">
            Track your compliance status across multiple frameworks.
          </p>
        </div>
        <Link 
          href="/dashboard/comply"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Run Compliance Scan
        </Link>
      </div>

      {/* Framework Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-[--bg-alt] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworks.map((framework) => {
            const StatusIcon = statusConfig[framework.status].icon
            
            return (
              <Card key={framework.id} className="relative">
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge color={statusConfig[framework.status].color as any}>
                    {statusConfig[framework.status].label}
                  </Badge>
                </div>

                {/* Framework Name */}
                <div className="flex items-center gap-3 mb-4">
                  <StatusIcon className={`w-8 h-8 text-${statusConfig[framework.status].color}-500`} />
                  <Title>{framework.name}</Title>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <Text>Progress</Text>
                    <Text>{framework.progress}%</Text>
                  </div>
                  <ProgressBar value={framework.progress} color={statusConfig[framework.status].color as any} />
                </div>

                {/* Controls */}
                <div className="flex justify-between text-sm mb-4">
                  <Text>Controls Passed</Text>
                  <Text className="font-semibold">
                    {framework.controlsPassed} / {framework.controlsTotal}
                  </Text>
                </div>

                {/* Audit Dates */}
                {framework.nextAudit && (
                  <div className="pt-4 border-t border-[--border]">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-[--text-light]" />
                      <Text>Next Audit: {new Date(framework.nextAudit).toLocaleDateString()}</Text>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-[--border] flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-[--bg-alt] rounded text-sm hover:bg-[--border] flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                  {framework.status === 'compliant' && (
                    <button className="px-3 py-2 bg-[--bg-alt] rounded text-sm hover:bg-[--border] flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Evidence Collection */}
      <Card>
        <Title>Evidence Collection</Title>
        <Text className="mb-4">
          Automated evidence collection for your compliance audits.
        </Text>
        
        <div className="bg-[--bg-alt] rounded-lg p-6 text-center">
          <FileText className="w-12 h-12 text-[--text-light] mx-auto mb-4" />
          <Text className="text-[--text-light]">
            Run a compliance scan to start collecting evidence automatically.
          </Text>
          <pre className="mt-4 p-3 bg-[--bg] rounded text-sm text-[--text-light] inline-block">
            infraiq comply scan --provider aws --framework soc2 --sync
          </pre>
        </div>
      </Card>
    </div>
  )
}
