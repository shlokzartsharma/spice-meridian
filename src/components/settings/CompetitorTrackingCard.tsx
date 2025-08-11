'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Trash2, Upload } from 'lucide-react'

export function CompetitorTrackingCard() {
  const [competitors, setCompetitors] = useState<string[]>(['Salesforce', 'Pipedrive', 'Zoho'])
  const [newCompetitor, setNewCompetitor] = useState('')

  const addCompetitor = () => {
    if (newCompetitor.trim() && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()])
      setNewCompetitor('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCompetitor()
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitor Tracking</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Competitor
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="e.g., Salesforce"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={addCompetitor} disabled={!newCompetitor.trim()}>
              Add
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Competitors ({competitors.length})
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {competitors.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No competitors added yet</p>
            ) : (
              competitors.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{competitor}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCompetitors(competitors.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Import from CSV
        </Button>

        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Add your main competitors to track how you rank against them in AI recommendations.
          </p>
        </div>
      </div>
    </Card>
  )
} 