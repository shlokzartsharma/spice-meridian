'use client'

import { cn } from '@/lib/utils'
import { 
  BarChart3, 
  Search, 
  Lightbulb, 
  Settings,
  HelpCircle,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3
  },
  {
    name: 'Prompts',
    href: '/prompts',
    icon: Search
  },
  {
    name: 'Insights',
    href: '/insights',
    icon: Lightbulb
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  },
  {
    name: 'How to Use',
    href: '/how-to-use',
    icon: HelpCircle
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900">Spice</span>
        </div>
        
        {/* Navigation */}
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 mr-3',
                  isActive ? 'text-orange-600' : 'text-gray-400'
                )} />
                {item.name}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto text-orange-600" />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">AI Signal Detection</p>
            <p className="text-sm text-gray-700 font-medium">
              Track your brand mentions in AI responses
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
} 