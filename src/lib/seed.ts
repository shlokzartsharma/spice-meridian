import { prisma } from './db'
import { samplePrompts, sampleSearchResults, sampleBrandMentions, sampleAnalyses } from './sample-data'

export async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...')

  try {
    // Clear existing data
    await prisma.analysis.deleteMany()
    await prisma.brandMention.deleteMany()
    await prisma.searchResult.deleteMany()
    await prisma.prompt.deleteMany()

    console.log('✅ Cleared existing data')

    // Create sample prompts
    const createdPrompts = await Promise.all(
      samplePrompts.map(async (promptData) => {
        return await prisma.prompt.create({
          data: {
            text: promptData.text,
            category: promptData.category,
            status: 'completed'
          }
        })
      })
    )

    console.log(`✅ Created ${createdPrompts.length} prompts`)

    // Create sample search results and analyses for each prompt
    for (let i = 0; i < createdPrompts.length; i++) {
      const prompt = createdPrompts[i]
      const promptIndex = i % 2 // Use different sample data for variety
      
      // Get search results for this prompt
      const resultsForPrompt = sampleSearchResults.slice(promptIndex * 2, (promptIndex + 1) * 2)
      
      // Create search results
      const createdResults = await Promise.all(
        resultsForPrompt.map(async (resultData) => {
          return await prisma.searchResult.create({
            data: {
              promptId: prompt.id,
              url: resultData.url,
              title: resultData.title,
              content: resultData.content,
              source: resultData.source,
              isAIGenerated: resultData.isAIGenerated
            }
          })
        })
      )

      // Create brand mentions for each result
      const allMentions = []
      for (const result of createdResults) {
        const mentionsForResult = sampleBrandMentions.filter(mention => 
          result.content.toLowerCase().includes(mention.brandName.toLowerCase())
        )
        
        const createdMentions = await Promise.all(
          mentionsForResult.map(async (mentionData) => {
            return await prisma.brandMention.create({
              data: {
                searchResultId: result.id,
                brandName: mentionData.brandName,
                mentionText: mentionData.mentionText,
                sentiment: mentionData.sentiment,
                position: mentionData.position,
                features: mentionData.features
              }
            })
          })
        )
        allMentions.push(...createdMentions)
      }

      // Create analysis
      const analysisData = sampleAnalyses[i % sampleAnalyses.length]
      await prisma.analysis.create({
        data: {
          promptId: prompt.id,
          totalResults: createdResults.length,
          brandsFound: analysisData.brandsFound,
          brandRankings: analysisData.brandRankings,
          sentimentSummary: analysisData.sentimentSummary,
          keyInsights: analysisData.keyInsights,
          visibilityScore: analysisData.visibilityScore
        }
      })
    }

    console.log('✅ Created search results, brand mentions, and analyses')
    console.log('🎉 Database seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
} 