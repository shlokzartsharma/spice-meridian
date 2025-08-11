import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'
import { Clock, Plus, CheckCircle } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'prompt_added' | 'analysis_completed'
  description: string
  timestamp: Date
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'prompt_added':
        return <Plus className="w-4 h-4 text-blue-600" />
      case 'analysis_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getActivityBadge = (type: ActivityItem['type']) => {
    switch (type) {
      case 'prompt_added':
        return <Badge variant="info" size="sm">Added</Badge>
      case 'analysis_completed':
        return <Badge variant="success" size="sm">Completed</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">{activity.description}</p>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatDateTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 