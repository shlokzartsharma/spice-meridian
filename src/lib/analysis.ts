import { BrandMention, Analysis } from '@/types'
import { sampleBrandMentions, sampleAnalyses } from './sample-data'
import { delay } from './utils'

export async function analyzeBrandMentions(content: string): Promise<Omit<BrandMention, 'id' | 'searchResultId' | 'createdAt'>[]> {
  // Simulate AI analysis delay
  await delay(1500)
  
  // In a real implementation, this would call OpenAI API
  // For demo purposes, we'll return sample data based on content
  const contentLower = content.toLowerCase()
  
  if (contentLower.includes('hubspot')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'HubSpot')
  }
  
  if (contentLower.includes('salesforce')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Salesforce')
  }
  
  if (contentLower.includes('pipedrive')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Pipedrive')
  }
  
  if (contentLower.includes('auth0')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Auth0')
  }
  
  if (contentLower.includes('firebase')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Firebase Auth')
  }
  
  if (contentLower.includes('slack')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Slack')
  }
  
  if (contentLower.includes('asana')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Asana')
  }
  
  if (contentLower.includes('monday.com')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Monday.com')
  }
  
  if (contentLower.includes('notion')) {
    return sampleBrandMentions.filter(mention => mention.brandName === 'Notion')
  }
  
  // Return empty array if no brands found
  return []
}

export async function createAnalysis(
  promptId: string,
  searchResults: any[],
  brandMentions: Omit<BrandMention, 'id' | 'searchResultId' | 'createdAt'>[]
): Promise<Omit<Analysis, 'id' | 'createdAt'>> {
  // Simulate analysis processing
  await delay(1000)
  
  // Group mentions by brand
  const brandGroups = brandMentions.reduce((acc, mention) => {
    if (!acc[mention.brandName]) {
      acc[mention.brandName] = []
    }
    acc[mention.brandName].push(mention)
    return acc
  }, {} as Record<string, typeof brandMentions>)
  
  // Calculate brand rankings
  const brandRankings: Record<string, { mentions: number; avgPosition: number; sentiment: number }> = {}
  
  Object.entries(brandGroups).forEach(([brandName, mentions]) => {
    const positions = mentions.map(m => m.position).filter(p => p !== undefined) as number[]
    const avgPosition = positions.length > 0 ? positions.reduce((a, b) => a + b, 0) / positions.length : 0
    
    const sentimentScores: number[] = mentions.map(m => {
      switch (m.sentiment) {
        case 'positive': return 1
        case 'neutral': return 0.5
        case 'negative': return 0
        default: return 0.5
      }
    })
    const avgSentiment = sentimentScores.length > 0 
      ? sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length 
      : 0
    
    brandRankings[brandName] = {
      mentions: mentions.length,
      avgPosition,
      sentiment: avgSentiment
    }
  })
  
  // Calculate sentiment summary
  const sentimentCounts = brandMentions.reduce((acc, mention) => {
    acc[mention.sentiment] = (acc[mention.sentiment] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const totalMentions = brandMentions.length
  const sentimentSummary = {
    positive: totalMentions > 0 ? Math.round((sentimentCounts.positive || 0) / totalMentions * 100) : 0,
    neutral: totalMentions > 0 ? Math.round((sentimentCounts.neutral || 0) / totalMentions * 100) : 0,
    negative: totalMentions > 0 ? Math.round((sentimentCounts.negative || 0) / totalMentions * 100) : 0
  }
  
  // Generate key insights
  const topBrand = Object.entries(brandRankings)
    .sort(([, a], [, b]) => b.mentions - a.mentions)[0]
  
  const keyInsights = topBrand 
    ? `${topBrand[0]} leads recommendations with ${topBrand[1].mentions} mentions and ${(topBrand[1].sentiment * 100).toFixed(0)}% positive sentiment.`
    : 'No significant brand mentions found in analyzed content.'
  
  // Calculate visibility score (percentage of responses mentioning tracked brands)
  const trackedBrands = ['HubSpot', 'Auth0', 'Slack', 'Asana'] // Demo tracked brands
  const responsesWithTrackedBrands = searchResults.filter(result => 
    trackedBrands.some(brand => 
      result.content.toLowerCase().includes(brand.toLowerCase())
    )
  ).length
  
  const visibilityScore = searchResults.length > 0 
    ? (responsesWithTrackedBrands / searchResults.length) * 100 
    : 0
  
  return {
    promptId,
    totalResults: searchResults.length,
    brandsFound: Object.keys(brandRankings),
    brandRankings,
    sentimentSummary,
    keyInsights,
    visibilityScore
  }
}

export async function getSampleAnalysis(promptId: string): Promise<Omit<Analysis, 'id' | 'createdAt'>> {
  // Return sample analysis based on prompt content
  const sampleIndex = Math.floor(Math.random() * sampleAnalyses.length)
  return {
    ...sampleAnalyses[sampleIndex],
    promptId
  }
} 