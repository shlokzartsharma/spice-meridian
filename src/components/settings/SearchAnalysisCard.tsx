'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function SearchAnalysisCard() {
  const [region, setRegion] = useState('US')
  const [language, setLanguage] = useState('en')
  const [frequency, setFrequency] = useState('daily')
  const [aiSensitivity, setAiSensitivity] = useState(75)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Analysis Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Geographic Region
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="US">United States</option>
            <option value="EU">Europe</option>
            <option value="GLOBAL">Global</option>
            <option value="APAC">Asia Pacific</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analysis Frequency
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="realtime">Real-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="manual">Manual Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI Content Detection Sensitivity: {aiSensitivity}%
          </label>
          <input
            type="range"
            min="50"
            max="95"
            value={aiSensitivity}
            onChange={(e) => setAiSensitivity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Less Strict</span>
            <span>More Strict</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Higher sensitivity means more accurate AI content detection but may miss some results.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Real-time analysis requires API credits and may incur additional costs.
          </p>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSave}
          loading={saving}
        >
          Save Search Settings
        </Button>
      </div>
    </Card>
  )
} 