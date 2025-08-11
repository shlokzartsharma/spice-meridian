import { Card } from '@/components/ui/Card'
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react'

export function BestPractices() {
  const practices = [
    {
      type: 'do',
      title: 'Do',
      items: [
        'Use specific, customer-focused prompts that match real search behavior',
        'Track multiple variations of your brand name and common misspellings',
        'Monitor competitors regularly to understand market positioning',
        'Set up alerts for significant changes in visibility or sentiment',
        'Analyze trends over time rather than individual data points',
        'Focus on high-intent keywords that indicate purchase consideration'
      ]
    },
    {
      type: 'dont',
      title: 'Don\'t',
      items: [
        'Use overly broad or generic search terms',
        'Ignore negative sentiment - use it to improve your positioning',
        'Focus only on your brand without tracking competitors',
        'Make decisions based on small sample sizes',
        'Forget to update your brand configuration when you rebrand',
        'Rely solely on AI data without considering other marketing metrics'
      ]
    },
    {
      type: 'tips',
      title: 'Pro Tips',
      items: [
        'Create prompts that mirror how your customers actually ask questions',
        'Track seasonal variations in AI recommendations',
        'Use the insights to inform your content marketing strategy',
        'Compare your AI visibility with traditional SEO rankings',
        'Set up competitor alerts to stay ahead of market changes',
        'Regularly review and update your tracking keywords'
      ]
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'do':
        return CheckCircle
      case 'dont':
        return AlertTriangle
      case 'tips':
        return Lightbulb
      default:
        return CheckCircle
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'do':
        return 'bg-green-50 border-green-200'
      case 'dont':
        return 'bg-red-50 border-red-200'
      case 'tips':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getIconColors = (type: string) => {
    switch (type) {
      case 'do':
        return 'text-green-600 bg-green-100'
      case 'dont':
        return 'text-red-600 bg-red-100'
      case 'tips':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <section id="best-practices" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {practices.map((practice) => {
          const Icon = getIcon(practice.type)
          return (
            <Card key={practice.title} className={`p-6 ${getColors(practice.type)}`}>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getIconColors(practice.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{practice.title}</h3>
              </div>
              
              <ul className="space-y-2">
                {practice.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </section>
  )
} 