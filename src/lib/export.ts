import { Prompt, Analysis, SearchResult, BrandMention } from '@/types'

export type ExportFormat = 'csv' | 'json' | 'xlsx'

export interface ExportData {
  prompts: Prompt[]
  analyses: Analysis[]
  searchResults: SearchResult[]
  brandMentions: BrandMention[]
  exportDate: string
  summary: {
    totalPrompts: number
    totalAnalyses: number
    totalSearchResults: number
    totalBrandMentions: number
    averageVisibilityScore: number
    topBrands: Array<{ name: string; mentions: number; avgSentiment: number }>
  }
}

export async function exportData(format: ExportFormat, data: ExportData): Promise<void> {
  switch (format) {
    case 'csv':
      return exportToCSV(data)
    case 'json':
      return exportToJSON(data)
    case 'xlsx':
      return exportToExcel(data)
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}

async function exportToCSV(data: ExportData): Promise<void> {
  const csvContent = generateCSVContent(data)
  downloadFile(csvContent, 'spice-insights-export.csv', 'text/csv')
}

async function exportToJSON(data: ExportData): Promise<void> {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, 'spice-insights-export.json', 'application/json')
}

async function exportToExcel(data: ExportData): Promise<void> {
  // For Excel export, we'll create a CSV with multiple sheets concept
  // In a real implementation, you'd use a library like 'xlsx'
  const csvContent = generateExcelCSVContent(data)
  downloadFile(csvContent, 'spice-insights-export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

function generateCSVContent(data: ExportData): string {
  const lines: string[] = []
  
  // Summary section
  lines.push('SPICE INSIGHTS EXPORT SUMMARY')
  lines.push('')
  lines.push(`Export Date,${data.exportDate}`)
  lines.push(`Total Prompts,${data.summary.totalPrompts}`)
  lines.push(`Total Analyses,${data.summary.totalAnalyses}`)
  lines.push(`Total Search Results,${data.summary.totalSearchResults}`)
  lines.push(`Total Brand Mentions,${data.summary.totalBrandMentions}`)
  lines.push(`Average Visibility Score,${data.summary.averageVisibilityScore.toFixed(2)}%`)
  lines.push('')
  
  // Top brands section
  lines.push('TOP BRANDS BY MENTIONS')
  lines.push('Brand Name,Mentions,Average Sentiment')
  data.summary.topBrands.forEach(brand => {
    lines.push(`${brand.name},${brand.mentions},${brand.avgSentiment.toFixed(2)}%`)
  })
  lines.push('')
  
  // Prompts section
  lines.push('PROMPTS')
  lines.push('ID,Text,Category,Status,Created At,Updated At')
  data.prompts.forEach(prompt => {
    lines.push(`${prompt.id},"${prompt.text}",${prompt.category || ''},${prompt.status},${prompt.createdAt},${prompt.updatedAt}`)
  })
  lines.push('')
  
  // Analyses section
  lines.push('ANALYSES')
  lines.push('ID,Prompt ID,Visibility Score,Total Results,Brands Found,Key Insights')
  data.analyses.forEach(analysis => {
    lines.push(`${analysis.id},${analysis.promptId},${analysis.visibilityScore}%,${analysis.totalResults},${analysis.brandsFound.join(';')},"${analysis.keyInsights.replace(/"/g, '""')}"`)
  })
  lines.push('')
  
  // Search Results section
  lines.push('SEARCH RESULTS')
  lines.push('ID,Prompt ID,Title,Source,URL,Content Preview')
  data.searchResults.forEach(result => {
    const contentPreview = result.content.substring(0, 100).replace(/"/g, '""')
    lines.push(`${result.id},${result.promptId},"${result.title}","${result.source}","${result.url}","${contentPreview}..."`)
  })
  lines.push('')
  
  // Brand Mentions section
  lines.push('BRAND MENTIONS')
  lines.push('ID,Search Result ID,Brand Name,Mention Text,Sentiment,Position')
  data.brandMentions.forEach(mention => {
    const position = mention.position != null ? mention.position.toString() : 'N/A'
    lines.push(`${mention.id},${mention.searchResultId},"${mention.brandName}","${mention.mentionText.replace(/"/g, '""')}",${mention.sentiment},${position}`)
  })
  
  return lines.join('\n')
}

function generateExcelCSVContent(data: ExportData): string {
  // This is a simplified version - in production you'd use a proper Excel library
  return generateCSVContent(data)
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Type for Prisma query result
type PrismaPromptWithRelations = {
  id: string
  text: string
  category: string | null
  status: string
  createdAt: Date
  updatedAt: Date
  analysis: {
    id: string
    createdAt: Date
    promptId: string
    totalResults: number
    brandsFound: any
    brandRankings: any
    sentimentSummary: any
    keyInsights: string
    visibilityScore: number
  } | null
  searchResults: Array<{
    id: string
    promptId: string
    title: string
    source: string
    url: string
    content: string
    mentions: Array<{
      id: string
      searchResultId: string
      brandName: string
      mentionText: string
      sentiment: string
      position: number | null
      createdAt: Date
      features?: any
    }>
  }>
}

export function prepareExportData(prompts: PrismaPromptWithRelations[]): ExportData {
  const analyses: Analysis[] = []
  const searchResults: SearchResult[] = []
  const brandMentions: BrandMention[] = []
  
  // Collect all related data
  prompts.forEach(prompt => {
    if (prompt.analysis) {
      analyses.push(prompt.analysis as Analysis)
    }
    if (prompt.searchResults) {
      searchResults.push(...prompt.searchResults as SearchResult[])
      prompt.searchResults.forEach(result => {
        if (result.mentions) {
          brandMentions.push(...result.mentions as BrandMention[])
        }
      })
    }
  })
  
  // Calculate summary statistics
  const totalPrompts = prompts.length
  const totalAnalyses = analyses.length
  const totalSearchResults = searchResults.length
  const totalBrandMentions = brandMentions.length
  
  const averageVisibilityScore = analyses.length > 0 
    ? analyses.reduce((sum, analysis) => sum + analysis.visibilityScore, 0) / analyses.length
    : 0
  
  // Calculate top brands
  const brandStats = new Map<string, { mentions: number; totalSentiment: number }>()
  
  brandMentions.forEach(mention => {
    const existing = brandStats.get(mention.brandName) || { mentions: 0, totalSentiment: 0 }
    existing.mentions += 1
    existing.totalSentiment += mention.sentiment === 'positive' ? 1 : mention.sentiment === 'negative' ? -1 : 0
    brandStats.set(mention.brandName, existing)
  })
  
  const topBrands = Array.from(brandStats.entries())
    .map(([name, stats]) => ({
      name,
      mentions: stats.mentions,
      avgSentiment: (stats.totalSentiment / stats.mentions + 1) * 50 // Convert to 0-100 scale
    }))
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 10)
  
  return {
    prompts: prompts as Prompt[],
    analyses,
    searchResults,
    brandMentions,
    exportDate: new Date().toISOString(),
    summary: {
      totalPrompts,
      totalAnalyses,
      totalSearchResults,
      totalBrandMentions,
      averageVisibilityScore,
      topBrands
    }
  }
} 