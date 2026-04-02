import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useFinanceStore } from '../../store/useFinanceStore'
import { CAT_COLORS } from '../../data/mockData'
import { formatCurrency } from '../../utils/helpers'
import { Card } from '../UI'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
    >
      <p style={{ color: 'var(--text)' }}>{name}</p>
      <p style={{ color: 'var(--amber)' }}>{formatCurrency(value)}</p>
    </div>
  )
}

export default function SpendingPieChart() {
  const breakdown = useFinanceStore((s) => s.getCategoryBreakdown())
  const top6 = breakdown.slice(0, 6)
  const total = top6.reduce((s, d) => s + d.amount, 0)

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Spending Breakdown</h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>By category</p>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={top6}
            dataKey="amount"
            nameKey="cat"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={72}
            paddingAngle={2}
            strokeWidth={0}
          >
            {top6.map((entry) => (
              <Cell
                key={entry.cat}
                fill={CAT_COLORS[entry.cat] || '#64748b'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 flex flex-col gap-2">
        {top6.map(({ cat, amount }) => (
          <div key={cat} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2" style={{ color: 'var(--text2)' }}>
              <span
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ background: CAT_COLORS[cat] || '#64748b' }}
              />
              {cat}
            </span>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--text)', fontFamily: 'DM Mono, monospace' }}>
                {formatCurrency(amount)}
              </span>
              <span style={{ color: 'var(--text3)', minWidth: 28, textAlign: 'right' }}>
                {Math.round((amount / total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
