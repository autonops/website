'use client'

import { Card, Title, Text, Badge, ProgressBar } from '@tremor/react'
import { Rocket, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

interface Migration {
  id: string
  name: string
  source: string
  target: string
  status: 'planning' | 'in_progress' | 'completed' | 'failed'
  progress: number
  startedAt: string
  completedAt: string | null
}

const statusConfig = {
  planning: { color: 'gray', icon: Clock, label: 'Planning' },
  in_progress: { color: 'blue', icon: Rocket, label: 'In Progress' },
  completed: { color: 'green', icon: CheckCircle, label: 'Completed' },
  failed: { color: 'red', icon: AlertCircle, label: 'Failed' },
}

export default function MigrationsPage() {
  const [migrations, setMigrations] = useState<Migration[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchMigrations() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/scans')
        if (response.ok) {
          const data = await response.json()
          
          // Filter for migration scans
          const migrationScans = (data.scans || []).filter(
            (s: any) => s.tool === 'migrate'
          )
          
          // Convert to migration format
          const migrationsData: Migration[] = migrationScans.map((scan: any) => ({
            id: scan.id,
            name: `Migration from ${scan.provider}`,
            source: scan.provider,
            target: 'AWS', // Default target
            status: scan.status === 'completed' ? 'completed' : 'planning',
            progress: scan.status === 'completed' ? 100 : 25,
            startedAt: scan.created_at,
            completedAt: scan.status === 'completed' ? scan.created_at : null,
          }))
          
          setMigrations(migrationsData)
        }
      } catch (err) {
        console.error('Failed to fetch migrations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMigrations()
  }, [userId])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">Migrations</h1>
          <p className="text-[--text-light] mt-1">
            Track your cloud migration projects and progress.
          </p>
        </div>
        <Link 
          href="/dashboard/migrate"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start New Migration
        </Link>
      </div>

      {/* Migrations List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-[--bg-alt] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : migrations.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Rocket className="w-16 h-16 text-[--text-light] mx-auto mb-4" />
            <Title>No migrations yet</Title>
            <Text className="text-[--text-light] mt-2 max-w-md mx-auto">
              Start your first cloud migration by scanning your source infrastructure.
            </Text>
            
            <div className="mt-8 space-y-4 max-w-lg mx-auto text-left">
              <div className="bg-[--bg-alt] rounded-lg p-4">
                <Text className="font-semibold mb-2">1. Scan your source</Text>
                <pre className="p-2 bg-[--bg] rounded text-sm text-[--text-light]">
                  infraiq migrate scan heroku --app-name myapp --sync
                </pre>
              </div>
              
              <div className="bg-[--bg-alt] rounded-lg p-4">
                <Text className="font-semibold mb-2">2. Map to target cloud</Text>
                <pre className="p-2 bg-[--bg] rounded text-sm text-[--text-light]">
                  infraiq migrate map scan.json aws
                </pre>
              </div>
              
              <div className="bg-[--bg-alt] rounded-lg p-4">
                <Text className="font-semibold mb-2">3. Generate Terraform</Text>
                <pre className="p-2 bg-[--bg] rounded text-sm text-[--text-light]">
                  infraiq migrate generate plan.json --output terraform/
                </pre>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {migrations.map((migration) => {
            const StatusIcon = statusConfig[migration.status].icon
            
            return (
              <Card key={migration.id}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[--bg-alt] flex items-center justify-center">
                      <StatusIcon className={`w-6 h-6 text-${statusConfig[migration.status].color}-500`} />
                    </div>
                    <div>
                      <Title className="text-lg">{migration.name}</Title>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{migration.source}</Badge>
                        <ArrowRight className="w-4 h-4 text-[--text-light]" />
                        <Badge color="blue">{migration.target}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Badge color={statusConfig[migration.status].color as any}>
                    {statusConfig[migration.status].label}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <Text>Progress</Text>
                    <Text>{migration.progress}%</Text>
                  </div>
                  <ProgressBar value={migration.progress} color={statusConfig[migration.status].color as any} />
                </div>
                
                <div className="flex justify-between text-sm text-[--text-light]">
                  <span>Started: {new Date(migration.startedAt).toLocaleDateString()}</span>
                  {migration.completedAt && (
                    <span>Completed: {new Date(migration.completedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
