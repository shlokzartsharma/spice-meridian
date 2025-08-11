// src/app/api/prompts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: {
        analysis: true,
        searchResults: {
          include: {
            mentions: true,
          },
        },
      },
    })

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: prompt,
    })
  } catch (error) {
    console.error('Error fetching prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompt' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id },
    })

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt not found' },
        { status: 404 }
      )
    }

    await prisma.prompt.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Prompt deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete prompt' },
      { status: 500 }
    )
  }
}
