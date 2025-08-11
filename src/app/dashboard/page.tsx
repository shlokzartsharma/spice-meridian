'use client'

import { useEffect, useState } from 'react'
import { MetricsOverview } from '@/components/dashboard/MetricsOverview'
import { BrandRankingsTable } from '@/components/dashboard/BrandRankingsTable'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DashboardMetrics } from '@/types'
import { Plus, Download } from 'lucide-react'
import Link from 'next/link'
import { exportData, ExportFormat } from '@/lib/export'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      
      if (data.success) {
        setMetrics(data.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your brand visibility in AI responses</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load dashboard</h2>
        <p className="text-gray-600 mb-4">Please try refreshing the page</p>
        <Button onClick={fetchDashboardData}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your brand visibility in AI responses</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExport('csv')}
            loading={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Link href="/prompts">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Prompt
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsOverview 
        visibilityScore={metrics.visibilityScore}
        totalPrompts={metrics.totalPrompts}
        completedAnalyses={metrics.completedAnalyses}
        averageSentiment={metrics.averageSentiment}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Rankings */}
        <div className="lg:col-span-2">
          <BrandRankingsTable rankings={metrics.brandRankings} />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity activities={metrics.recentActivity} />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/prompts">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Add New Prompt</h4>
                  <p className="text-sm text-gray-500">Start tracking a new market question</p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/insights">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">View Insights</h4>
                  <p className="text-sm text-gray-500">Detailed analysis and trends</p>
                </div>
              </div>
            </Card>
          </Link>
          
          <button 
            className="w-full text-left"
            onClick={() => handleExport('csv')}
            disabled={exporting}
          >
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <Download className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Export Data</h4>
                  <p className="text-sm text-gray-500">Download reports and analytics</p>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </Card>
    </div>
  )
} 