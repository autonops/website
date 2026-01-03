import { Suspense } from 'react'
import { Card, Title, Text } from '@tremor/react'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentScans } from '@/components/dashboard/recent-scans'
import { RecommendedActions } from '@/components/dashboard/recommended-actions'
import { QuickActions } from '@/components/dashboard/quick-actions'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[--text]">Dashboard</h1>
        <p className="text-[--text-light] mt-1">
          Overview of your infrastructure and recent activity.
        </p>
      </div>
      
      {/* Stats Row */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scans - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <Title>Recent Activity</Title>
            <Text>Your latest scans across all tools.</Text>
            <Suspense fallback={<RecentScansSkeleton />}>
              <RecentScans />
            </Suspense>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Recommended Actions */}
          <Card>
            <Title>Recommended Actions</Title>
            <Suspense fallback={<div className="h-32 animate-pulse bg-[--bg-alt] rounded" />}>
              <RecommendedActions />
            </Suspense>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <Title>Quick Actions</Title>
            <QuickActions />
          </Card>
        </div>
      </div>
    </div>
  )
}

// Loading skeletons
function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="stat-card animate-pulse">
          <div className="h-8 w-20 bg-[--bg-alt] rounded mb-2" />
          <div className="h-4 w-32 bg-[--bg-alt] rounded" />
        </div>
      ))}
    </div>
  )
}

function RecentScansSkeleton() {
  return (
    <div className="mt-4 space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-[--bg-alt] rounded animate-pulse" />
      ))}
    </div>
  )
}
