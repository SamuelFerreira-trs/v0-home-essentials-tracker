"use client"

import type { CategoryStats } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface CategoryCardProps {
  stats: CategoryStats
  color: string
  onClick: () => void
}

export function CategoryCard({ stats, color, onClick }: CategoryCardProps) {
  const percentage = stats.total > 0 ? Math.round((stats.purchased / stats.total) * 100) : 0

  return (
    <Card
      className="p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-lg border-2"
      style={{
        backgroundColor: color,
        borderColor: color,
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{stats.category}</h3>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-5 w-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-700">{percentage}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">{stats.total} Itens</span>
          <span className="text-gray-700">{stats.purchased} Concluídos</span>
        </div>

        <div className="w-full bg-white/40 rounded-full h-2">
          <div className="bg-gray-900 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
        </div>

        <div className="pt-2 border-t border-gray-900/20">
          <div className="text-xs text-gray-700">
            <span className="font-semibold">Orçamento:</span> R${" "}
            {stats.totalEstimatedCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          {stats.totalActualCost > 0 && (
            <div className="text-xs text-gray-700">
              <span className="font-semibold">Gasto:</span> R${" "}
              {stats.totalActualCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
