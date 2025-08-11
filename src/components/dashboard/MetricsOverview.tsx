import { MetricCard } from '@/components/ui/MetricCard'
import { formatPercentage } from '@/lib/utils'

interface MetricsOverviewProps {
  visibilityScore: number
  totalPrompts: number
  completedAnalyses: number
  averageSentiment: number
}

export function MetricsOverview({ 
  visibilityScore, 
  totalPrompts, 
  completedAnalyses, 
  averageSentiment 
}: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard 
        title="Visibility Score" 
        value={formatPercentage(visibilityScore)}
        subtitle="Percentage of AI responses that mention your brand"
        trend={{ value: 17.3, direction: 'up' }}
      />
      <MetricCard 
        title="Total Prompts" 
        value={totalPrompts}
        subtitle="Prompts analyzed"
      />
      <MetricCard 
        title="Completed Analyses" 
        value={completedAnalyses}
        subtitle="Successfully processed"
      />
      <MetricCard 
        title="Average Sentiment" 
        value={formatPercentage(averageSentiment)}
        subtitle="Positive sentiment across mentions"
      />
    </div>
  )
} 