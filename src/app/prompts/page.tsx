'use client'

import { useEffect, useState } from 'react'
import { AddPromptForm } from '@/components/prompts/AddPromptForm'
import { PromptsTable } from '@/components/prompts/PromptsTable'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Prompt } from '@/types'
import { Plus, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPrompts()
  }, [])

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts')
      const data = await response.json()
      
      if (data.success) {
        setPrompts(data.data)
      }
    } catch (error) {
      console.error('Error fetching prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPrompt = async (text: string, category: string) => {
    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, category }),
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh the prompts list
        await fetchPrompts()
      } else {
        throw new Error(data.error || 'Failed to add prompt')
      }
    } catch (error) {
      console.error('Error adding prompt:', error)
      throw error
    }
  }

  const handleDeletePrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      
      if (data.success) {
        setPrompts(prompts.filter(prompt => prompt.id !== id))
      } else {
        throw new Error(data.error || 'Failed to delete prompt')
      }
    } catch (error) {
      console.error('Error deleting prompt:', error)
      throw error
    }
  }

  const handleViewResults = (id: string) => {
    router.push(`/insights?promptId=${id}`)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPrompts()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Market Research Prompts</h1>
            <p className="text-gray-600 mt-1">Track how your brand is mentioned in AI responses</p>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Market Research Prompts</h1>
          <p className="text-gray-600 mt-1">Track how your brand is mentioned in AI responses</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          loading={refreshing}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Add Prompt Form */}
      <AddPromptForm onSubmit={handleAddPrompt} />

      {/* Prompts Table */}
      <PromptsTable 
        prompts={prompts}
        onDelete={handleDeletePrompt}
        onViewResults={handleViewResults}
      />

      {/* Empty State */}
      {prompts.length === 0 && !loading && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No prompts yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start by adding your first market research prompt. This will help you track how your brand is mentioned in AI-generated responses across the web.
          </p>
          <div className="text-sm text-gray-500">
            <p>Example prompts:</p>
            <ul className="mt-2 space-y-1">
              <li>• "What are the best CRM tools for small businesses?"</li>
              <li>• "Best authentication providers for developers"</li>
              <li>• "Top team communication tools for remote work"</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  )
} 