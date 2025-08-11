import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TrendingUp, Target, Users, BarChart3 } from 'lucide-react'

export function CommonUseCases() {
  const useCases = [
    {
      icon: TrendingUp,
      title: 'Competitive Intelligence',
      description: 'Track how your brand performs against competitors in AI recommendations',
      examples: [
        'Monitor competitor mentions and positioning',
        'Identify market gaps and opportunities',
        'Track changes in competitive landscape'
      ],
      prompts: [
        'best CRM software for small business',
        'top project management tools 2024',
        'email marketing platforms comparison'
      ]
    },
    {
      icon: Target,
      title: 'Brand Positioning',
      description: 'Understand how your brand is perceived and positioned in AI responses',
      examples: [
        'Analyze brand sentiment and perception',
        'Identify key features and benefits highlighted',
        'Track positioning changes over time'
      ],
      prompts: [
        'what is [brand] known for',
        '[brand] vs competitors',
        'why choose [brand]'
      ]
    },
    {
      icon: Users,
      title: 'Customer Research',
      description: 'Understand customer needs and pain points through AI search behavior',
      examples: [
        'Identify common customer questions',
        'Understand decision-making factors',
        'Track emerging customer needs'
      ],
      prompts: [
        'how to choose [product category]',
        '[problem] solution',
        'best [product] for [use case]'
      ]
    },
    {
      icon: BarChart3,
      title: 'Market Trends',
      description: 'Track industry trends and emerging topics in AI conversations',
      examples: [
        'Monitor industry keyword trends',
        'Identify emerging technologies',
        'Track seasonal variations'
      ],
      prompts: [
        'trending [industry] tools',
        'new [technology] solutions',
        '[industry] trends 2024'
      ]
    }
  ]

  return (
    <section id="use-cases" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.title} className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <useCase.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{useCase.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Examples:</h4>
              <ul className="space-y-1">
                {useCase.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Sample Prompts:</h4>
              <div className="flex flex-wrap gap-2">
                {useCase.prompts.map((prompt, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    "{prompt}"
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
} 