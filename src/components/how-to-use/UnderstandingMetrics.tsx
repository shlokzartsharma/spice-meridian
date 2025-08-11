import { Card } from '@/components/ui/Card'
import { TrendingUp, Eye, Target, MessageSquare } from 'lucide-react'

export function UnderstandingMetrics() {
  const metrics = [
    {
      icon: Eye,
      title: 'Visibility Score',
      description: 'Percentage of AI responses that mention your brand',
      details: [
        'Shows how often your brand appears in AI recommendations',
        'Higher scores indicate better AI visibility',
        'Compare against competitors to understand market position'
      ],
      example: '85% means your brand is mentioned in 85 out of 100 AI responses'
    },
    {
      icon: TrendingUp,
      title: 'Sentiment Analysis',
      description: 'How positively or negatively your brand is mentioned',
      details: [
        'Positive: Brand is recommended favorably',
        'Neutral: Brand is mentioned without strong opinion',
        'Negative: Brand is criticized or not recommended'
      ],
      example: '75% positive means 3 out of 4 mentions are favorable'
    },
    {
      icon: Target,
      title: 'Brand Rankings',
      description: 'Your position compared to competitors in AI responses',
      details: [
        'Shows competitive positioning in AI recommendations',
        'Track changes over time to measure improvement',
        'Identify which competitors are mentioned more often'
      ],
      example: 'Ranked #2 means you\'re the second most mentioned brand'
    },
    {
      icon: MessageSquare,
      title: 'Mention Context',
      description: 'How your brand is positioned and described',
      details: [
        'Understand the context of brand mentions',
        'Identify key features and benefits highlighted',
        'Spot opportunities for positioning improvement'
      ],
      example: 'Often mentioned as "user-friendly" or "best for small businesses"'
    }
  ]

  return (
    <section id="understanding-metrics" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Your Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <metric.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{metric.description}</p>
            
            <div className="space-y-2 mb-4">
              {metric.details.map((detail, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{detail}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> {metric.example}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
} 