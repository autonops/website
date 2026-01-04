import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react'
import { Shield, Server, CheckCircle, Rocket } from 'lucide-react'
import { getDashboardStats, DashboardStats } from '@/lib/api'

// Fallback data when API is unavailable
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
  let data: DashboardStats
  let isLive = false
  
  try {
    data = await getDashboardStats()
    isLive = true
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    data = fallbackStats
  }
  
  const stats = [
    {
      name: 'Resources Monitored',
      value: data.resources_monitored.toLocaleString(),
      icon: Server,
      change: isLive ? 'Live Data' : 'Offline',
      changeType: isLive ? 'increase' as const : 'decrease' as const,
    },
    {
      name: 'Security Score',
      value: `${data.security_grade} (${data.security_score}%)`,
      icon: Shield,
      change: data.security_score >= 80 ? 'Good' : 'Needs attention',
      changeType: data.security_score >= 80 ? 'increase' as const : 'decrease' as cons
