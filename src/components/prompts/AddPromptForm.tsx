'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'

interface AddPromptFormProps {
  onSubmit: (prompt: string, category: string) => Promise<void>
}

export function AddPromptForm({ onSubmit }: AddPromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      await onSubmit(prompt.trim(), category.trim())
      setPrompt('')
      setCategory('')
    } catch (error) {
      console.error('Error adding prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Market Research Prompt</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Research Question
          </label>
          <textarea 
            id="prompt"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
            rows={4}
            placeholder="e.g., What are the best CRM tools for small businesses?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Enter a question that potential customers might ask AI assistants about your product category.
          </p>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category (Optional)
          </label>
          <input 
            id="category"
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            placeholder="e.g., CRM, Authentication, Marketing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        
        <Button 
          type="submit" 
          loading={loading} 
          disabled={!prompt.trim()}
          className="w-full"
        >
          <Search className="w-4 h-4 mr-2" />
          Add Prompt & Start Analysis
        </Button>
      </form>
    </Card>
  )
}
