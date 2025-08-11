'use client'

import { BrandConfigurationCard } from '@/components/settings/BrandConfigurationCard'
import { CompetitorTrackingCard } from '@/components/settings/CompetitorTrackingCard'
import { SearchAnalysisCard } from '@/components/settings/SearchAnalysisCard'
import { APIConfigurationCard } from '@/components/settings/APIConfigurationCard'
import { NotificationsCard } from '@/components/settings/NotificationsCard'
import { DataExportCard } from '@/components/settings/DataExportCard'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your brand tracking and analysis preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BrandConfigurationCard />
        <CompetitorTrackingCard />
        <SearchAnalysisCard />
        <APIConfigurationCard />
        <NotificationsCard />
        <DataExportCard />
      </div>
    </div>
  )
} 