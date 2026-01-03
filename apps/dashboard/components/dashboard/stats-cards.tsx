import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react'
import { Shield, Server, CheckCircle, Rocket } from 'lucide-react'

// This would normally fetch from the API
// For now, using placeholder data
const stats = [
  {
    name: 'Resources Monitored',
    value: '847',
    icon: Server,
    change: '+12%',
    changeType: 'increase' as const,
  },
  {
    name: 'Security Score',
    value: 'B+ (84%)',
    icon: Shield,
    change: '+5%',
    changeType: 'increase' as const,
  },
  {
    name: 'Compliance',
    value: 'SOC2 ✓',
    icon: CheckCircle,
    change: 'Compliant',
    changeType: 'unchanged' as const,
  },
  {
    name: 'Active Migrations',
    value: '2',
    icon: Rocket,
    change: 'In Progress',
    changeType: 'unchanged' as const,
  },
]

export async function StatsCards() {
  // In a real app, fetch data here:
  // const stats = await dashboardApi.stats()
  
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
