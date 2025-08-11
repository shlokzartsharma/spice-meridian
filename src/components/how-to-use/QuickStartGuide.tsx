import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Settings, Search, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export function QuickStartGuide() {
  const steps = [
    {
      number: 1,
      title: 'Configure Your Brand',
      description: 'Set up your brand name, aliases, and competitors in Settings',
      icon: Settings,
      actions: ['Go to Settings → Brand Configuration', 'Enter your brand name', 'Add competitors to track'],
      link: '/settings'
    },
    {
      number: 2,
      title: 'Add Research Prompts',
      description: 'Create prompts that potential customers ask AI assistants',
      icon: Search,
      actions: ['Navigate to Prompts page', 'Click Add New Prompt', 'Enter customer questions'],
      link: '/prompts'
    },
    {
      number: 3,
      title: 'Monitor Results',
      description: 'Track your brand performance in the Dashboard',
      icon: BarChart3,
      actions: ['Check Visibility Score', 'Review Brand Rankings', 'Analyze sentiment trends'],
      link: '/dashboard'
    }
  ]

  return (
    <section id="quick-start" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
      
      <div className="space-y-6">
        {steps.map((step) => (
          <Card key={step.number} className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <Link href={step.link}>
                    <Button variant="outline" size="sm">
                      Go to {step.title.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <ul className="space-y-1">
                  {step.actions.map((action, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
} 