import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react'
import { Shield, Server, CheckCircle, Rocket } from 'lucide-react'
import { getUserDashboardStats, DashboardStats } from '@/lib/api'
import { getCurrentUserApiKey } from '@/lib/get-current-user'

// Fallback data when API is unavailable or user not authenticated
const fallbackStats: DashboardStats = {
  resources_monitored: 0,
  security_score: 100,
  security_grade: 'A',
  compliance_status: [{ framework: 'SOC2', status: 'pending' }],
  active_migrations: 0,
  scans_this_week: 0,
  issues_resolved: 0,
}

export async function StatsCards() {
  let data: DashboardStats = fallbackStats
  let isLive = false
  
  try {
    // Get the current user's personal API key
    const userApiKey = await getCurrentUserApiKey()
    
    if (userApiKey) {
      // Fetch stats using user's personal key - returns ONLY their data
      data = await getUserDashboardStats(userApiKey)
      isLive = true
    } else {
      console.warn('[StatsCards] No user API key available')
    }
  } catch (error) {
    console.error('[StatsCards] Failed to fetch dashboard stats:', error)
  }
  
  const stats = [
    {
      name: 'Resources Monitored',
      value: data.resources_monitored.toLocaleString(),
      icon: Server,
      change: isLive ? 'Live Data' : 'No data',
      changeType: isLive ? 'increase' as const : 'unchanged' as const,
    },
    {
      name: 'Security Score',
      value: `${data.security_grade} (${data.security_score}%)`,
      icon: Shield,
      change: data.security_score >= 80 ? 'Good' : 'Needs attention',
      changeType: data.security_score >= 80 ? 'increase' as const : 'decrease' as const,
    },
    {
      name: 'Compliance',
      value: data.compliance_status[0]?.framework || 'SOC2',
      icon: CheckCircle,
      change: data.compliance_status[0]?.status === 'compliant' ? 'Compliant' : 'Pending',
      changeType: data.compliance_status[0]?.status === 'compliant' ? 'increase' as const : 'unchanged' as const,
    },
    {
      name: 'Active Migrations',
      value: data.active_migrations.toString(),
      icon: Rocket,
      change: data.active_migrations > 0 ? 'In Progress' : 'None active',
      changeType: 'unchanged' as const,
    },
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} decoration="top" decorationColor="blue">
          <Flex justifyContent="between" alignItems="center">
            <div>
              <Text>{stat.name}</Text>
              <Metric className="mt-1">{stat.value}</Metric>
            </div>
            <stat.icon className="h-8 w-8 text-[--text-light]" />
          </Flex>
          <Flex justifyContent="start" className="mt-4">
            <BadgeDelta deltaType={stat.changeType}>
              {stat.change}
            </BadgeDelta>
          </Flex>
        </Card>
      ))}
    </div>
  )
}
