'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, Trash2, Database } from 'lucide-react'

export function DataExportCard() {
  const [retentionPeriod, setRetentionPeriod] = useState('1year')
  const [exportFormat, setExportFormat] = useState('csv')
  const [autoBackup, setAutoBackup] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setExporting(false)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // Clear data logic
      console.log('Clearing all data...')
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Data & Export</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Retention Period
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={retentionPeriod}
            onChange={(e) => setRetentionPeriod(e.target.value)}
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
            <option value="2years">2 Years</option>
            <option value="forever">Forever</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Data older than this period will be automatically deleted
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xlsx">Excel</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Auto Backup</h3>
            <p className="text-xs text-gray-500">Weekly automatic data exports</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Storage Usage</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Analyses</span>
              <span className="font-medium">4.2 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Search Results</span>
              <span className="font-medium">12.8 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">17.0 MB</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleExport}
            loading={exporting}
          >
            <Download className="w-4 h-4 mr-2" />
            Export All Data
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleClearData}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Warning:</strong> Clearing data will permanently delete all analyses and cannot be undone.
          </p>
        </div>
      </div>
    </Card>
  )
} 