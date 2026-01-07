'use client'

import { Card, Title, Text, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react'
import { Server, Database, Globe, Shield, HardDrive, Cloud } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface Resource {
  id: string
  type: string
  name: string
  provider: string
  region: string
  status: string
  lastScanned: string
}

interface ResourceStats {
  total: number
  byProvider: Record<string, number>
  byType: Record<string, number>
}

const providerColors: Record<string, string> = {
  aws: 'orange',
  gcp: 'blue',
  azure: 'cyan',
  heroku: 'purple',
}

const typeIcons: Record<string, any> = {
  compute: Server,
  database: Database,
  network: Globe,
  security: Shield,
  storage: HardDrive,
  default: Cloud,
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [stats, setStats] = useState<ResourceStats>({
    total: 0,
    byProvider: {},
    byType: {},
  })
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchResources() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/scans')
        if (response.ok) {
          const data = await response.json()
          
          // Extract unique resources from scans
          const resourceMap = new Map<string, Resource>()
          const byProvider: Record<string, number> = {}
          const byType: Record<string, number> = {}
          
          for (const scan of data.scans || []) {
            // Count by provider
            byProvider[scan.provider] = (byProvider[scan.provider] || 0) + (scan.summary?.resources_scanned || 0)
            
            // Extract resources from findings
            for (const finding of scan.findings || []) {
              const resourceKey = `${finding.resource_type}-${finding.resource_id}`
              if (!resourceMap.has(resourceKey)) {
                resourceMap.set(resourceKey, {
                  id: finding.resource_id,
                  type: finding.resource_type,
                  name: finding.resource_id,
                  provider: scan.provider,
                  region: scan.region || 'us-east-1',
                  status: 'active',
                  lastScanned: scan.created_at,
                })
                
                // Count by type category
                const category = finding.resource_type.includes('ec2') || finding.resource_type.includes('compute') ? 'compute'
                  : finding.resource_type.includes('db') || finding.resource_type.includes('rds') ? 'database'
                  : finding.resource_type.includes('vpc') || finding.resource_type.includes('network') ? 'network'
                  : finding.resource_type.includes('iam') || finding.resource_type.includes('security') ? 'security'
                  : finding.resource_type.includes('s3') || finding.resource_type.includes('storage') ? 'storage'
                  : 'other'
                byType[category] = (byType[category] || 0) + 1
              }
            }
          }
          
          setResources(Array.from(resourceMap.values()))
          setStats({
            total: Object.values(byProvider).reduce((a, b) => a + b, 0),
            byProvider,
            byType,
          })
        }
      } catch (err) {
        console.error('Failed to fetch resources:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [userId])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[--text]">Resource Inventory</h1>
        <p className="text-[--text-light] mt-1">
          All resources discovered across your infrastructure scans.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card decoration="top" decorationColor="blue">
          <Text>Total Resources</Text>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        
        {Object.entries(stats.byProvider).slice(0, 3).map(([provider, count]) => (
          <Card key={provider} decoration="top" decorationColor={providerColors[provider] || 'gray'}>
            <Text>{provider.toUpperCase()}</Text>
            <p className="text-2xl font-bold">{count}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Resource Table */}
        <div className="lg:col-span-3">
          <Card>
            <Title>Discovered Resources</Title>
            
            {loading ? (
              <div className="mt-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-[--bg-alt] rounded animate-pulse" />
                ))}
              </div>
            ) : resources.length === 0 ? (
              <div className="mt-6 text-center py-8 bg-[--bg-alt] rounded-lg">
                <Cloud className="w-12 h-12 text-[--text-light] mx-auto mb-4" />
                <Text className="text-[--text-light]">No resources discovered yet</Text>
                <Text className="text-[--text-light] text-sm mt-1">
                  Run a scan to discover your infrastructure resources.
                </Text>
                <pre className="mt-4 p-3 bg-[--bg] rounded text-sm text-[--text-light] inline-block">
                  infraiq verify scan aws --sync
                </pre>
              </div>
            ) : (
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Resource</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Provider</TableHeaderCell>
                    <TableHeaderCell>Region</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <Text className="font-mono text-sm">{resource.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text className="text-sm">{resource.type}</Text>
                      </TableCell>
                      <TableCell>
                        <Badge color={providerColors[resource.provider] || 'gray'}>
                          {resource.provider.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Text className="text-sm">{resource.region}</Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

        {/* Sidebar - Resource Types */}
        <div>
          <Card>
            <Title>By Category</Title>
            <div className="mt-4 space-y-3">
              {Object.entries(stats.byType).map(([type, count]) => {
                const Icon = typeIcons[type] || typeIcons.default
                return (
                  <div key={type} className="flex items-center justify-between p-2 bg-[--bg-alt] rounded">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[--text-light]" />
                      <Text className="capitalize">{type}</Text>
                    </div>
                    <Badge>{count}</Badge>
                  </div>
                )
              })}
              {Object.keys(stats.byType).length === 0 && (
                <Text className="text-[--text-light] text-sm">No resources yet</Text>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
