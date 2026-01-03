import Link from 'next/link'
import { AlertTriangle, Calendar, Lightbulb } from 'lucide-react'

// Placeholder data
const recommendations = [
  {
    id: '1',
    type: 'security',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    title: '3 critical security issues',
    description: 'Need immediate review',
    actionUrl: '/verify',
    actionLabel: 'Review in VerifyIQ',
  },
  {
    id: '2',
    type: 'compliance',
    icon: Calendar,
    iconColor: 'text-yellow-500',
    title: 'SOC2 evidence due',
    description: 'In 14 days',
    actionUrl: '/comply',
    actionLabel: 'Open ComplyIQ',
  },
  {
    id: '3',
    type: 'optimization',
    icon: Lightbulb,
    iconColor: 'text-blue-500',
    title: 'Migration opportunity',
    description: 'Your Heroku app is a good candidate for Tessera analysis',
    actionUrl: '/tessera',
    actionLabel: 'Start Analysis',
  },
]

export async function RecommendedActions() {
  return (
    <div className="mt-4 space-y-4">
      {recommendations.map((rec) => (
        <div 
          key={rec.id}
          className="flex items-start gap-3 p-3 rounded-lg bg-[--bg-alt] border border-[--border]"
        >
          <rec.icon className={`h-5 w-5 mt-0.5 ${rec.iconColor}`} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-[--text]">{rec.title}</p>
            <p className="text-xs text-[--text-light] mt-0.5">{rec.description}</p>
            <Link 
              href={rec.actionUrl}
              className="text-xs text-[--primary] hover:underline mt-2 inline-block"
            >
              {rec.actionLabel} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
