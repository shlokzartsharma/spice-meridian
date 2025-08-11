import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface BrandRanking {
  name: string
  score: number
  isYou: boolean
}

interface BrandRankingsTableProps {
  rankings: BrandRanking[]
}

export function BrandRankingsTable({ rankings }: BrandRankingsTableProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Rankings</h3>
      <div className="space-y-3">
        {rankings.map((brand, index) => (
          <div key={brand.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <span className="font-medium text-gray-900">{brand.name}</span>
              {brand.isYou && (
                <Badge variant="info" className="ml-2">
                  You
                </Badge>
              )}
            </div>
            <span className="font-semibold text-gray-900">{brand.score.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
} 