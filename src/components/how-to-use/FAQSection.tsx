"use client";

import { Card } from '@/components/ui/Card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: 'How accurate is the AI content detection?',
      answer: 'Our AI detection system is trained on millions of AI-generated content samples and achieves over 95% accuracy. However, it may occasionally misclassify content, especially for very short or ambiguous text.'
    },
    {
      question: 'How often should I run analyses?',
      answer: 'We recommend running analyses weekly for most use cases. For competitive monitoring, daily analysis may be beneficial. You can adjust the frequency in Settings based on your needs and API usage limits.'
    },
    {
      question: 'Can I track multiple brands or products?',
      answer: 'Yes! You can track multiple brands by adding them as aliases in your brand configuration. For completely different products, you may want to create separate accounts or contact us about enterprise features.'
    },
    {
      question: 'What search engines do you use?',
      answer: 'We primarily use Brave Search API, which provides comprehensive web search results. This includes results from Google, Bing, and other major search engines while respecting privacy and providing high-quality results.'
    },
    {
      question: 'How do you calculate the visibility score?',
      answer: 'The visibility score is calculated as the percentage of AI-generated responses that mention your brand out of the total responses analyzed. A score of 85% means your brand appears in 85 out of 100 AI responses.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes! You can export all your analysis data in CSV, JSON, or Excel formats. Go to Settings → Data & Export to download your data or set up automatic backups.'
    },
    {
      question: 'What happens if I exceed my API limits?',
      answer: 'When you reach your API limits, analyses will be paused until your quota resets (usually monthly). You can upgrade your plan for higher limits or reduce analysis frequency to stay within your current plan.'
    },
    {
      question: 'How do you handle data privacy?',
      answer: 'We take data privacy seriously. All API keys are encrypted, and we only store the analysis results, not the raw search queries. You can delete your data at any time through the Settings page.'
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="faq" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-6">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </a>
          <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            View Documentation
          </a>
        </div>
      </div>
    </section>
  )
}
