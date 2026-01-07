'use client'

import { AlertTriangle, Calendar, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface Recommendation {
  id: string
  type: 'security' | 'compliance' | 'migration' | 'optimization'
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  link: string
}

const typeConfig = {
  security: { icon: AlertTriangle, color: 'red' },
  compliance: { icon: Calendar, color: 'yellow' },
  migration: { icon: Lightbulb, color: 'blue' },
  optimization: { icon: Lightbulb, color: 'green' },
}

const severityConfig = {
  critical: 'bg-red-500/10 border-red-500/20 hover:border-red-500/40',
  warning: 'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40',
  info: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
}

export function RecommendedActions() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchRecommendations() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/scans')
        if (response.ok) {
          const data = await response.json()
          
          // Generate dynamic recommendations based on scan data
          const recs: Recommendation[] = []
          
          // Count issues from scans
          let criticalCount = 0
          let highCount = 0
          let hasHerokuScans = false
          
          for (const scan of data.scans || []) {
            criticalCount += scan.summary?.critical || 0
            highCount += scan.summary?.high || 0
            if (scan.provider === 'heroku') {
              hasHerokuScans = true
            }
          }
          
          // Add security recommendation if there are critical issues
          if (criticalCount > 0) {
            recs.push({
              id: 'security-critical',
              type: 'security',
              title: `${criticalCount} critical security issue${criticalCount > 1 ? 's' : ''}`,
              description: 'Need immediate review',
              severity: 'critical',
              link: '/dashboard/security?severity=critical',
            })
          } else if (highCount > 0) {
            recs.push({
              id: 'security-high',
              type: 'security',
              title: `${highCount} high severity issue${highCount > 1 ? 's' : ''}`,
              description: 'Review recommended',
              severity: 'warning',
              link: '/dashboard/security?severity=high',
            })
          }
          
          // Add compliance recommendation (static for now)
          recs.push({
            id: 'compliance-soc2',
            type: 'compliance',
            title: 'SOC2 evidence due',
            description: 'In 14 days',
            severity: 'warning',
            link: '/dashboard/compliance',
          })
          
          // Add migration recommendation if Heroku detected
          if (hasHerokuScans) {
            recs.push({
              id: 'migration-heroku',
              type: 'migration',
              title: 'Migration opportunity',
              description: 'Your Heroku app is a good candidate for Tessera analysis',
              severity: 'info',
              link: '/dashboard/tessera',
            })
          } else if (data.scans?.length === 0) {
            recs.push({
              id: 'get-started',
              type: 'optimization',
              title: 'Get started',
              description: 'Run your first infrastructure scan',
              severity: 'info',
              link: '/dashboard/verify',
            })
          }
          
          setRecommendations(recs)
        }
      } catch (err) {
        console.error('Failed to fetch recommendations:', err)
        // Set default recommendations on error
        setRecommendations([
          {
            id: 'default',
            type: 'optimization',
            title: 'Get started',
            description: 'Run your first infrastructure scan',
            severity: 'info',
            link: '/dashboard/verify',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [userId])

  if (loading) {
    return (
      <div className="mt-4 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-[--bg-alt] rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="mt-4 text-center py-6 bg-[--bg-alt] rounded-lg">
        <p className="text-[--text-light]">No recommendations at this time</p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      {recommendations.map((rec) => {
        const Icon = typeConfig[rec.type].icon
        
        return (
          <Link
            key={rec.id}
            href={rec.link}
            className={`block p-4 rounded-lg border transition-colors ${severityConfig[rec.severity]}`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 text-${typeConfig[rec.type].color}-500 flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[--text]">{rec.title}</p>
                <p className="text-sm text-[--text-light]">{rec.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[--text-light] flex-shrink-0" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
