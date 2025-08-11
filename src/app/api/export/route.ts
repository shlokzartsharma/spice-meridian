import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { prepareExportData, exportData, ExportFormat } from '@/lib/export'

export async function POST(request: NextRequest) {
  try {
    const { format = 'csv' } = await request.json()
    
    // Validate format
    if (!['csv', 'json', 'xlsx'].includes(format)) {
      return NextResponse.json(
        { success: false, error: 'Invalid export format' },
        { status: 400 }
      )
    }

    // Fetch all prompts with their related data
    const prompts = await prisma.prompt.findMany({
      include: {
        analysis: true,
        searchResults: {
          include: {
            mentions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Prepare export data
    const exportData = prepareExportData(prompts)

    // Return the data for client-side export
    return NextResponse.json({
      success: true,
      data: exportData,
      format
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export data' },
      { status: 500 }
    )
  }
} 