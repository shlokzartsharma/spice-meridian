import { TableOfContents } from '@/components/how-to-use/TableOfContents'
import { QuickStartGuide } from '@/components/how-to-use/QuickStartGuide'
import { UnderstandingMetrics } from '@/components/how-to-use/UnderstandingMetrics'
import { BestPractices } from '@/components/how-to-use/BestPractices'
import { CommonUseCases } from '@/components/how-to-use/CommonUseCases'
import { TroubleshootingSection } from '@/components/how-to-use/TroubleshootingSection'
import { FAQSection } from '@/components/how-to-use/FAQSection'

export default function HowToUsePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">How to Use Spice</h1>
        <p className="text-xl text-gray-600 mt-2">
          Complete guide to tracking your brand's performance in AI-generated content
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <TableOfContents />
        
        <section id="what-is-spice" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Spice?</h2>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Spice is a powerful brand intelligence platform that helps you understand how your brand is mentioned, 
              positioned, and recommended in AI-generated content across the web. As AI assistants like ChatGPT, 
              Claude, and others become primary sources of information for consumers, it's crucial to monitor 
              your brand's presence in these conversations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-sm text-gray-600">
                We search the web for AI-generated responses to your research prompts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analyze</h3>
              <p className="text-sm text-gray-600">
                AI analyzes mentions, sentiment, and competitive positioning
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Insights</h3>
              <p className="text-sm text-gray-600">
                Get actionable insights to improve your brand's AI visibility
              </p>
            </div>
          </div>
        </section>

        <QuickStartGuide />
        <UnderstandingMetrics />
        <BestPractices />
        <CommonUseCases />
        <TroubleshootingSection />
        <FAQSection />
      </div>
    </div>
  )
} 