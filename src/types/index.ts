export interface SearchResult {
  id: string
  promptId: string
  url: string
  title: string
  content: string
  source: string
  isAIGenerated: boolean
  createdAt: Date
  mentions: BrandMention[]
}

export interface BrandMention {
  id: string
  searchResultId: string
  brandName: string
  mentionText: string
  sentiment: 'positive' | 'negative' | 'neutral'
  position?: number
  features?: string[]
  createdAt: Date
}

export interface Analysis {
  id: string
  promptId: string
  totalResults: number
  brandsFound: string[]
  brandRankings: Record<string, {
    mentions: number
    avgPosition: number
    sentiment: number
  }>
  sentimentSummary: {
    positive: number
    neutral: number
    negative: number
  }
  keyInsights: string
  visibilityScore: number
  createdAt: Date
}

export interface Prompt {
  id: string
  text: string
  category?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
  searchResults: SearchResult[]
  analysis?: Analysis
}

export interface DashboardMetrics {
  visibilityScore: number
  totalPrompts: number
  completedAnalyses: number
  averageSentiment: number
  recentActivity: Array<{
    id: string
    type: 'prompt_added' | 'analysis_completed'
    description: string
    timestamp: Date
  }>
  brandRankings: Array<{
    name: string
    score: number
    isYou: boolean
  }>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
} 