import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react'
import { Shield, Server, CheckCircle, Rocket } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUserApiKey } from '@/lib/get-current-user'
import { getUserDashboardStats, DashboardStats } from '@/lib/api'

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
    const userApiKey = await getCurrentUserApiKey()
    
    if (userApiKey) {
      data = await getUserDashboardStats(userApiKey)
      isLive = true
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
      href: '/dashboard/resources',
    },
    {
      name: 'Security Score',
      value: `${data.security_grade} (${data.security_score}%)`,
      icon: Shield,
      change: data.security_score >= 80 ? 'Good' : 'Needs attention',
      changeType: data.security_score >= 80 ? 'increase' as const : 'decrease' as const,
      href: '/dashboard/security',
    },
    {
      name: 'Compliance',
      value: data.compliance_status[0]?.framework || 'SOC2',
      icon: CheckCircle,
      change: data.compliance_status[0]?.status === 'compliant' ? 'Compliant' : 'Pending',
      changeType: data.compliance_status[0]?.status === 'compliant' ? 'increase' as const : 'unchanged' as const,
      href: '/dashboard/compliance',
    },
    {
      name: 'Active Migrations',
      value: data.active_migrations.toString(),
      icon: Rocket,
      change: data.active_migrations > 0 ? 'In Progress' : 'None active',
      changeType: 'unchanged' as const,
      href: '/dashboard/migrations',
    },
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Link key={stat.name} href={stat.href}>
          <Card 
            decoration="top" 
            decorationColor="blue"
            className="cursor-pointer hover:border-blue-500 transition-colors"
          >
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
        </Link>
      ))}
    </div>
  )
}
