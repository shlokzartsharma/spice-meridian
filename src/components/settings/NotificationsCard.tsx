'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function NotificationsCard() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [email, setEmail] = useState('marketing@company.com')
  const [alertThreshold, setAlertThreshold] = useState(10)
  const [frequency, setFrequency] = useState('daily')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications & Alerts</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
            <p className="text-xs text-gray-500">Receive analysis updates and alerts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={(e) => setEmailEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {emailEnabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Frequency
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black" 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold: {alertThreshold}% change
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get alerts when visibility score changes by this amount
              </p>
            </div>
          </>
        )}

        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm text-green-800">
            <strong>Tip:</strong> Set up alerts to stay informed about significant changes in your brand's AI visibility.
          </p>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSave}
          loading={saving}
        >
          Save Notification Settings
        </Button>
      </div>
    </Card>
  )
} 