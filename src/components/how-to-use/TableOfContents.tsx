import { Card } from '@/components/ui/Card'

export function TableOfContents() {
  const sections = [
    { id: 'what-is-spice', title: 'What is Spice?' },
    { id: 'quick-start', title: 'Quick Start Guide' },
    { id: 'understanding-metrics', title: 'Understanding Your Metrics' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'use-cases', title: 'Common Use Cases' },
    { id: 'troubleshooting', title: 'Troubleshooting' },
    { id: 'faq', title: 'FAQ' }
  ]

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
      <nav className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-blue-600 hover:text-blue-800 transition-colors py-1"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </Card>
  )
} 