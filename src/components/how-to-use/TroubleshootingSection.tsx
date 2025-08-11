import { Card } from '@/components/ui/Card'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

export function TroubleshootingSection() {
  const issues = [
    {
      problem: 'No search results found',
      solution: 'Try using more specific keywords or check if your API keys are properly configured. Ensure your search terms are relevant to your industry.',
      icon: AlertTriangle,
      severity: 'warning'
    },
    {
      problem: 'Low visibility score',
      solution: 'This is normal for new brands. Focus on creating high-quality content and improving your online presence. Consider tracking more specific, long-tail keywords.',
      icon: Info,
      severity: 'info'
    },
    {
      problem: 'API rate limits exceeded',
      solution: 'Upgrade your API plan or reduce analysis frequency. Check your API usage in the Settings page and adjust accordingly.',
      icon: AlertTriangle,
      severity: 'warning'
    },
    {
      problem: 'Incorrect brand mentions',
      solution: 'Add brand aliases and common misspellings in Settings. Review and update your brand configuration regularly.',
      icon: CheckCircle,
      severity: 'success'
    },
    {
      problem: 'Analysis taking too long',
      solution: 'Large datasets may take several minutes. Check your internet connection and API status. Consider reducing the number of search results.',
      icon: Info,
      severity: 'info'
    },
    {
      problem: 'Sentiment analysis seems inaccurate',
      solution: 'AI sentiment analysis may not always capture context perfectly. Review individual mentions and consider manual verification for important insights.',
      icon: Info,
      severity: 'info'
    }
  ]

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'success':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getIconColors = (severity: string) => {
    switch (severity) {
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      case 'success':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <section id="troubleshooting" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {issues.map((issue) => {
          const Icon = issue.icon
          return (
            <Card key={issue.problem} className={`p-6 ${getSeverityColors(issue.severity)}`}>
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${getIconColors(issue.severity)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.problem}</h3>
                  <p className="text-sm text-gray-700">{issue.solution}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Still Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you're experiencing issues not covered above, please check our documentation or contact support.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Documentation →
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Contact Support →
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Community Forum →
          </a>
        </div>
      </div>
    </section>
  )
} 