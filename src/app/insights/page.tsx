'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate, formatPercentage } from '@/lib/utils'
import { Prompt, Analysis, SearchResult, BrandMention } from '@/types'
import { ArrowLeft, ExternalLink, TrendingUp, Eye, BarChart3, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { exportData, ExportFormat } from '@/lib/export'

export default function InsightsPage() {
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('promptId')

  useEffect(() => {
    if (promptId) {
      fetchPromptData(promptId)
    } else {
      fetchAllPrompts()
    }
  }, [promptId])

  const fetchPromptData = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setPrompt(data.data)
        setAnalysis(data.data.analysis)
        setSearchResults(data.data.searchResults)
      }
    } catch (error) {
      console.error('Error fetching prompt data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPrompts = async () => {
    try {
      const response = await fetch('/api/prompts')
      const data = await response.json()
      
      if (data.success) {
        setAllPrompts(data.data.filter((p: Prompt) => p.status === 'completed'))
      }
    } catch (error) {
      console.error('Error fetching prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: ExportFormat = 'csv') => {
    setExporting(true)
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ format }),
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const result = await response.json()
      
      if (result.success) {
        await exportData(format, result.data)
      } else {
        throw new Error(result.error || 'Export failed')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Show insights overview when no specific prompt is selected
  if (!promptId) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Insights Overview</h1>
            <p className="text-gray-600 mt-1">Summary of all your brand intelligence analyses</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              loading={exporting}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Link href="/prompts">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Prompts
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {allPrompts.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {new Set(allPrompts.map(p => p.category).filter(Boolean)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Latest Analysis</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {allPrompts.length > 0 ? formatDate(allPrompts[0].createdAt) : 'None'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Visibility</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {allPrompts.length > 0 ? '85.2%' : '0%'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* All Analyses */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Analyses</h3>
          {allPrompts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No analyses yet</h4>
              <p className="text-gray-600 mb-4">Complete your first analysis to see insights here.</p>
              <Link href="/prompts">
                <Button>Go to Prompts</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {allPrompts.map((prompt) => (
                <div key={prompt.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{prompt.text}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{prompt.category || 'Uncategorized'}</span>
                        <span>•</span>
                        <span>{formatDate(prompt.createdAt)}</span>
                        {prompt.analysis && (
                          <>
                            <span>•</span>
                            <span>{prompt.analysis.totalResults} results</span>
                            <span>•</span>
                            <span>{formatPercentage(prompt.analysis.visibilityScore)} visibility</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="success">Completed</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/insights?promptId=${prompt.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    )
  }

  // Show detailed analysis for specific prompt
  if (!prompt || !analysis) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis not found</h2>
        <p className="text-gray-600 mb-4">The requested analysis could not be found or is still processing.</p>
        <Link href="/insights">
          <Button>Back to Insights</Button>
        </Link>
      </div>
    )
  }

  const brandRankings = Object.entries(analysis.brandRankings as Record<string, any>)
    .map(([brand, data]) => ({
      name: brand,
      mentions: data.mentions,
      avgPosition: data.avgPosition,
      sentiment: data.sentiment * 100,
      isYou: ['HubSpot', 'Auth0', 'Slack', 'Asana'].includes(brand)
    }))
    .sort((a, b) => b.mentions - a.mentions)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/insights">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
            <p className="text-gray-600 mt-1">{prompt.text}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExport('csv')}
            loading={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Badge variant={prompt.status === 'completed' ? 'success' : 'warning'}>
            {prompt.status}
          </Badge>
          <span className="text-sm text-gray-500">
            {formatDate(prompt.createdAt)}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Visibility Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatPercentage(analysis.visibilityScore)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Results</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {analysis.totalResults}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brands Found</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {analysis.brandsFound.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Sentiment</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatPercentage((analysis.sentimentSummary as any).positive)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Rankings */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Rankings</h3>
            <div className="space-y-3">
              {brandRankings.map((brand, index) => (
                <div key={brand.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{brand.name}</span>
                    {brand.isYou && (
                      <Badge variant="info" className="ml-2">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{brand.mentions} mentions</div>
                    <div className="text-sm text-gray-500">
                      {brand.sentiment.toFixed(0)}% positive
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Insights */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {analysis.keyInsights}
            </p>
          </Card>

          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Positive</span>
                <span className="font-medium text-green-600">
                  {(analysis.sentimentSummary as any).positive}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Neutral</span>
                <span className="font-medium text-gray-600">
                  {(analysis.sentimentSummary as any).neutral}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Negative</span>
                <span className="font-medium text-red-600">
                  {(analysis.sentimentSummary as any).negative}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Search Results */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Responses</h3>
        <div className="space-y-4">
          {searchResults.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-500">{result.source}</p>
                </div>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View
                </a>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {result.content}
              </p>
              {result.mentions && result.mentions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.mentions.map((mention: BrandMention) => (
                    <Badge 
                      key={mention.id} 
                      variant={mention.sentiment === 'positive' ? 'success' : mention.sentiment === 'negative' ? 'error' : 'default'}
                      size="sm"
                    >
                      {mention.brandName}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 