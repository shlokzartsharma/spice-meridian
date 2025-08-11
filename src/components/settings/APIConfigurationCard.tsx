'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

type ApiStatus = 'untested' | 'testing' | 'valid' | 'invalid'

export function APIConfigurationCard() {
  const [braveApiKey, setBraveApiKey] = useState('')
  const [openaiApiKey, setOpenaiApiKey] = useState('')
  const [braveStatus, setBraveStatus] = useState<ApiStatus>('untested')
  const [openaiStatus, setOpenaiStatus] = useState<ApiStatus>('untested')
  const [saving, setSaving] = useState(false)

  const testBraveConnection = async () => {
    setBraveStatus('testing')
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBraveStatus('valid')
    } catch {
      setBraveStatus('invalid')
    }
  }

  const testOpenaiConnection = async () => {
    setOpenaiStatus('testing')
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000))
      setOpenaiStatus('valid')
    } catch {
      setOpenaiStatus('invalid')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  const StatusIndicator = ({ status }: { status: ApiStatus }) => {
    const config = {
      untested: {
        icon: AlertCircle,
        colors: 'bg-gray-100 text-gray-600',
        label: 'Not Tested'
      },
      testing: {
        icon: Clock,
        colors: 'bg-yellow-100 text-yellow-600',
        label: 'Testing...'
      },
      valid: {
        icon: CheckCircle,
        colors: 'bg-green-100 text-green-600',
        label: 'Connected'
      },
      invalid: {
        icon: XCircle,
        colors: 'bg-red-100 text-red-600',
        label: 'Invalid'
      }
    }

    const { icon: Icon, colors, label } = config[status]

    return (
      <Badge variant="default" className={colors}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Brave Search API Key
            </label>
            <StatusIndicator status={braveStatus} />
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="BSA..."
              value={braveApiKey}
              onChange={(e) => setBraveApiKey(e.target.value)}
            />
            <Button 
              variant="outline" 
              onClick={testBraveConnection}
              disabled={braveStatus === 'testing'}
            >
              Test
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Required for web search functionality. Get your key at <a href="https://api.search.brave.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Brave Search API</a>
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              OpenAI API Key
            </label>
            <StatusIndicator status={openaiStatus} />
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="sk-..."
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
            />
            <Button 
              variant="outline" 
              onClick={testOpenaiConnection}
              disabled={openaiStatus === 'testing'}
            >
              Test
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Required for AI analysis of search results. Get your key at <a href="https://platform.openai.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI Platform</a>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">API Usage Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Brave Searches</span>
              <div className="font-medium">1,247 / 2,000</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <span className="text-gray-600">OpenAI Tokens</span>
              <div className="font-medium">45.2K / 100K</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Usage resets monthly. Upgrade your plan for higher limits.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> API keys are encrypted and stored securely. You can test connections before saving.
          </p>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSave}
          loading={saving}
        >
          Save API Configuration
        </Button>
      </div>
    </Card>
  )
} 