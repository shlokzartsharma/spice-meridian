import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get all prompts and analyses
    const [prompts, analyses] = await Promise.all([
      prisma.prompt.findMany({
        include: {
          analysis: true
        }
      }),
      prisma.analysis.findMany()
    ])

    // Calculate metrics
    const totalPrompts = prompts.length
    const completedAnalyses = analyses.length
    
    // Calculate average visibility score
    const visibilityScore = analyses.length > 0 
      ? analyses.reduce((sum, analysis) => sum + analysis.visibilityScore, 0) / analyses.length
      : 0

    // Calculate average sentiment
    const allSentiments = analyses.flatMap(analysis => {
      const summary = analysis.sentimentSummary as any
      return [
        ...Array(summary.positive || 0).fill(1),
        ...Array(summary.neutral || 0).fill(0.5),
        ...Array(summary.negative || 0).fill(0)
      ]
    })
    
    const averageSentiment = allSentiments.length > 0
      ? (allSentiments.reduce((sum, score) => sum + score, 0) / allSentiments.length) * 100
      : 0

    // Generate recent activity
    const recentActivity = [
      ...prompts.slice(0, 3).map(prompt => ({
        id: `prompt-${prompt.id}`,
        type: 'prompt_added' as const,
        description: `Added prompt: "${prompt.text.substring(0, 50)}${prompt.text.length > 50 ? '...' : ''}"`,
        timestamp: prompt.createdAt
      })),
      ...analyses.slice(0, 2).map(analysis => ({
        id: `analysis-${analysis.id}`,
        type: 'analysis_completed' as const,
        description: `Completed analysis with ${analysis.totalResults} results`,
        timestamp: analysis.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

    // Generate brand rankings
    const brandRankings = analyses.length > 0 ? generateBrandRankings(analyses) : []

    return NextResponse.json({
      success: true,
      data: {
        visibilityScore,
        totalPrompts,
        completedAnalyses,
        averageSentiment,
        recentActivity,
        brandRankings
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

function generateBrandRankings(analyses: any[]) {
  const brandScores: Record<string, { totalScore: number; count: number }> = {}
  
  analyses.forEach(analysis => {
    const rankings = analysis.brandRankings as Record<string, any>
    Object.entries(rankings).forEach(([brand, data]) => {
      if (!brandScores[brand]) {
        brandScores[brand] = { totalScore: 0, count: 0 }
      }
      brandScores[brand].totalScore += data.sentiment * 100
      brandScores[brand].count += 1
    })
  })

  return Object.entries(brandScores)
    .map(([brand, data]) => ({
      name: brand,
      score: data.totalScore / data.count,
      isYou: ['HubSpot', 'Auth0', 'Slack', 'Asana'].includes(brand)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
} 