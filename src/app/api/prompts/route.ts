import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { searchWeb } from '@/lib/search'
import { analyzeBrandMentions, createAnalysis } from '@/lib/analysis'

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        analysis: true,
        _count: {
          select: {
            searchResults: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: prompts
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, category } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt text is required' },
        { status: 400 }
      )
    }

    // Create the prompt
    const prompt = await prisma.prompt.create({
      data: {
        text: text.trim(),
        category: category?.trim() || null,
        status: 'processing'
      }
    })

    // Start background analysis
    processAnalysis(prompt.id, text).catch(console.error)

    return NextResponse.json({
      success: true,
      data: prompt
    })
  } catch (error) {
    console.error('Error creating prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create prompt' },
      { status: 500 }
    )
  }
}

async function processAnalysis(promptId: string, query: string) {
  try {
    // Update status to processing
    await prisma.prompt.update({
      where: { id: promptId },
      data: { status: 'processing' }
    })

    // Search for AI-generated content
    const searchResults = await searchWeb(query)
    
    // Save search results
    const savedResults = await Promise.all(
      searchResults.map(result => 
        prisma.searchResult.create({
          data: {
            promptId,
            url: result.url,
            title: result.title,
            content: result.content,
            source: result.source,
            isAIGenerated: result.isAIGenerated
          }
        })
      )
    )

    // Analyze each result for brand mentions
    const allMentions: any[] = []
    for (const result of savedResults) {
      const mentions = await analyzeBrandMentions(result.content)
      const savedMentions = await Promise.all(
        mentions.map(mention =>
          prisma.brandMention.create({
            data: {
              searchResultId: result.id,
              brandName: mention.brandName,
              mentionText: mention.mentionText,
              sentiment: mention.sentiment,
              position: mention.position,
              features: mention.features
            }
          })
        )
      )
      allMentions.push(...savedMentions)
    }

    // Create analysis
    const analysisData = await createAnalysis(promptId, savedResults, allMentions)
    await prisma.analysis.create({
      data: analysisData
    })

    // Update prompt status to completed
    await prisma.prompt.update({
      where: { id: promptId },
      data: { status: 'completed' }
    })

  } catch (error) {
    console.error('Error processing analysis:', error)
    
    // Update prompt status to failed
    await prisma.prompt.update({
      where: { id: promptId },
      data: { status: 'failed' }
    })
  }
} 