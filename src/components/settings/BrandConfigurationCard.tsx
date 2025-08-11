'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'

export function BrandConfigurationCard() {
  const [brandName, setBrandName] = useState('HubSpot')
  const [aliases, setAliases] = useState<string[]>(['Hubspot', 'Hub Spot'])
  const [industry, setIndustry] = useState('crm')
  const [targetMarket, setTargetMarket] = useState('smb')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    // In a real app, you'd save to database/API
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Brand Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., HubSpot"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Aliases
          </label>
          <div className="space-y-2">
            {aliases.map((alias, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={alias}
                  onChange={(e) => {
                    const newAliases = [...aliases]
                    newAliases[index] = e.target.value
                    setAliases(newAliases)
                  }}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAliases(aliases.filter((_, i) => i !== index))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => setAliases([...aliases, ''])}
              className="w-full"
            >
              + Add Alias
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Alternative names people use (e.g., "Hubspot", "Hub Spot")
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select Industry</option>
            <option value="crm">CRM</option>
            <option value="authentication">Authentication</option>
            <option value="project-management">Project Management</option>
            <option value="email-marketing">Email Marketing</option>
            <option value="developer-tools">Developer Tools</option>
            <option value="analytics">Analytics</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Market
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={targetMarket}
            onChange={(e) => setTargetMarket(e.target.value)}
          >
            <option value="">Select Target Market</option>
            <option value="enterprise">Enterprise</option>
            <option value="smb">Small & Medium Business</option>
            <option value="startup">Startup</option>
            <option value="developer">Developer Tools</option>
            <option value="consumer">Consumer</option>
          </select>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSave}
          loading={saving}
        >
          Save Brand Configuration
        </Button>
      </div>
    </Card>
  )
} 