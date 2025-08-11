import { SearchResult } from '@/types'
import { sampleSearchResults } from './sample-data'
import { delay } from './utils'

export async function searchWeb(query: string): Promise<SearchResult[]> {
  // Simulate API delay
  await delay(2000)
  
  try {
    // In a real implementation, this would call Brave Search API
    // For demo purposes, we'll return sample data based on the query
    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('crm') || queryLower.includes('customer relationship')) {
      return sampleSearchResults.slice(0, 4).map((result, index) => ({
        ...result,
        id: `search-${Date.now()}-${index}`,
        promptId: '', // Will be set by caller
        createdAt: new Date()
      }))
    }
    
    if (queryLower.includes('auth') || queryLower.includes('authentication')) {
      return sampleSearchResults.slice(4, 6).map((result, index) => ({
        ...result,
        id: `search-${Date.now()}-${index}`,
        promptId: '', // Will be set by caller
        createdAt: new Date()
      }))
    }
    
    if (queryLower.includes('communication') || queryLower.includes('team') || queryLower.includes('slack')) {
      return sampleSearchResults.slice(6, 7).map((result, index) => ({
        ...result,
        id: `search-${Date.now()}-${index}`,
        promptId: '', // Will be set by caller
        createdAt: new Date()
      }))
    }
    
    if (queryLower.includes('project management') || queryLower.includes('asana')) {
      return sampleSearchResults.slice(7, 8).map((result, index) => ({
        ...result,
        id: `search-${Date.now()}-${index}`,
        promptId: '', // Will be set by caller
        createdAt: new Date()
      }))
    }
    
    // Default fallback
    return sampleSearchResults.slice(0, 3).map((result, index) => ({
      ...result,
      id: `search-${Date.now()}-${index}`,
      promptId: '', // Will be set by caller
      createdAt: new Date()
    }))
    
  } catch (error) {
    console.error('Search API error:', error)
    // Return sample data as fallback
    return sampleSearchResults.slice(0, 3).map((result, index) => ({
      ...result,
      id: `search-${Date.now()}-${index}`,
      promptId: '', // Will be set by caller
      createdAt: new Date()
    }))
  }
}

// Detect if content is from AI assistant
export async function isAIGeneratedContent(content: string): Promise<boolean> {
  const aiPatterns = [
    /as an ai/i,
    /i'm an ai/i,
    /based on my (analysis|knowledge)/i,
    /here are some (options|recommendations)/i,
    /i'd recommend/i,
    /from my understanding/i,
    /i should note/i,
    /according to sources/i,
    /i recommend/i
  ]
  
  return aiPatterns.some(pattern => pattern.test(content))
}

// Try to identify which AI assistant generated the content
export async function detectAISource(url: string, content: string): Promise<string> {
  if (url.includes('openai.com') || url.includes('chatgpt')) return 'ChatGPT'
  if (url.includes('anthropic.com') || url.includes('claude')) return 'Claude'
  if (url.includes('perplexity.ai')) return 'Perplexity'
  if (url.includes('bard.google.com')) return 'Bard'
  
  // Analyze content patterns to guess source
  if (content.includes('I don\'t have personal preferences') || content.includes('I\'d recommend')) return 'ChatGPT'
  if (content.includes('I should note')) return 'Claude'
  if (content.includes('According to sources')) return 'Perplexity'
  
  return 'AI Assistant'
} 