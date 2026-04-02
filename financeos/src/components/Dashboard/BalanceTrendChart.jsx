import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { MONTHLY_DATA } from '../../data/mockData'
import { Card } from '../UI'

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg p-3 text-sm shadow-lg"
      style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}
    >
      <p className="font-medium mb-1.5" style={{ color: 'var(--text)' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-sm inline-block" style={{ background: p.color }} />
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Balance Trend</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>Monthly income vs expenses — 2024</p>
        </div>
        {/* Mini legend */}
        <div className="flex gap-4 text-xs" style={{ color: 'var(--text2)' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 rounded inline-block" style={{ background: '#f5a623' }} />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 rounded inline-block" style={{ background: '#ef4444' }} />
            Expense
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5a623" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#5a6480', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#5a6480', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#f5a623"
            strokeWidth={2}
            fill="url(#incomeGrad)"
            dot={{ fill: '#f5a623', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#expenseGrad)"
            dot={{ fill: '#ef4444', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
