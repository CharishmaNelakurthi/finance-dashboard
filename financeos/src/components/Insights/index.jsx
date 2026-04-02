import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { useFinanceStore } from '../../store/useFinanceStore'
import { CAT_COLORS, MONTHLY_DATA } from '../../data/mockData'
import { formatCurrency, pctChange, filterByMonth, sumBy } from '../../utils/helpers'
import { Card } from '../UI'

// ── Metric Card (insight variant) ────────────────────────────────
function InsightMetric({ label, value, valueColor, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>
          {label}
        </p>
        <p className="text-2xl font-semibold font-mono" style={{ color: valueColor || 'var(--amber)' }}>
          {value}
        </p>
        {desc && (
          <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text2)' }}>{desc}</p>
        )}
      </Card>
    </motion.div>
  )
}

// ── Comparison Bar Row ────────────────────────────────────────────
function CompBar({ label, value, maxValue, color }) {
  const pct = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs w-28 flex-shrink-0" style={{ color: 'var(--text2)' }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg4)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-mono w-20 text-right" style={{ color: 'var(--text)' }}>
        {formatCurrency(value)}
      </span>
    </div>
  )
}

// ── Observation Item ──────────────────────────────────────────────
function ObsItem({ icon, text, highlight }) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg px-4 py-3"
      style={{ background: 'var(--bg3)' }}
    >
      <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        {text}{' '}
        {highlight && (
          <span className="font-medium" style={{ color: 'var(--text)' }}>{highlight}</span>
        )}
      </p>
    </div>
  )
}

// ── Custom tooltip for bar chart ──────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg p-3 text-xs shadow-lg" style={{ background: 'var(--bg3)', border: '1px solid var(--border2)' }}>
      <p className="font-medium mb-1" style={{ color: 'var(--text)' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2 mt-0.5" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-sm inline-block" style={{ background: p.color }} />
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

// ── Main Insights Component ───────────────────────────────────────
export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions)
  const breakdown = useFinanceStore((s) => s.getCategoryBreakdown())

  // Reference date: Nov 2024 (most recent full month in mock data)
  const NOW_MONTH = 10 // November = index 10
  const NOW_YEAR  = 2024

  const thisMonth = useMemo(() => filterByMonth(transactions, NOW_MONTH, NOW_YEAR), [transactions])
  const lastMonth = useMemo(() => filterByMonth(transactions, NOW_MONTH - 1, NOW_YEAR), [transactions])

  const thisIncome  = sumBy(thisMonth, 'income')
  const thisExpense = sumBy(thisMonth, 'expense')
  const lastIncome  = sumBy(lastMonth, 'income')
  const lastExpense = sumBy(lastMonth, 'expense')

  const totalIncome  = useFinanceStore((s) => s.getSummary().income)
  const totalExpense = useFinanceStore((s) => s.getSummary().expense)
  const savingsRate  = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0

  const topCat = breakdown[0]
  const expPct = pctChange(thisExpense, lastExpense)
  const incPct = pctChange(thisIncome, lastIncome)

  // Category trend: top 4 cats × last 6 months of MONTHLY_DATA as stacked bars
  const top4Cats = breakdown.slice(0, 4).map((d) => d.cat)
  // Build per-category month data from actual transactions
  const catTrendData = useMemo(() => {
    return ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, mi) => {
      const mIdx = mi + 6
      const row = { month }
      top4Cats.forEach((cat) => {
        row[cat] = transactions
          .filter((t) => {
            const d = new Date(t.date)
            return t.cat === cat && t.type === 'expense' && d.getMonth() === mIdx && d.getFullYear() === 2024
          })
          .reduce((s, t) => s + t.amount, 0)
      })
      return row
    })
  }, [transactions, top4Cats.join(',')])

  const catChartColors = ['#f5a623', '#3b82f6', '#2dd4bf', '#a78bfa']

  const maxComp = Math.max(thisIncome, thisExpense, lastIncome, lastExpense, 1)

  // Build smart observations
  const observations = useMemo(() => {
    const obs = []
    if (Math.abs(expPct) >= 5) {
      obs.push({
        icon: expPct > 0 ? '⚠' : '✓',
        text: `Spending ${expPct > 0 ? 'increased' : 'decreased'} by`,
        highlight: `${Math.abs(expPct)}% vs last month.`,
      })
    }
    if (Math.abs(incPct) >= 5) {
      obs.push({
        icon: incPct > 0 ? '✓' : '⚠',
        text: `Income ${incPct > 0 ? 'grew' : 'dropped'} by`,
        highlight: `${Math.abs(incPct)}% compared to last month.`,
      })
    }
    if (topCat) {
      obs.push({
        icon: '◈',
        text: `${topCat.cat} is your highest spending category at`,
        highlight: `${formatCurrency(topCat.amount)} total.`,
      })
    }
    const monthlySavings = thisIncome - thisExpense
    obs.push({
      icon: monthlySavings > 0 ? '◉' : '△',
      text: `This month's net savings:`,
      highlight: `${formatCurrency(monthlySavings)}${monthlySavings > 0 ? ' — great work!' : ' — consider reviewing your expenses.'}`,
    })
    if (savingsRate > 20) {
      obs.push({
        icon: '★',
        text: `Your overall savings rate of ${savingsRate}% exceeds the recommended 20% benchmark.`,
      })
    }
    return obs
  }, [expPct, incPct, topCat, savingsRate, thisIncome, thisExpense])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {/* Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightMetric
          label="Top Spending Category"
          value={topCat?.cat || '—'}
          valueColor="var(--amber)"
          desc={topCat ? `${formatCurrency(topCat.amount)} total across all recorded transactions.` : ''}
          delay={0}
        />
        <InsightMetric
          label="Savings Rate"
          value={`${savingsRate}%`}
          valueColor={savingsRate > 20 ? 'var(--green)' : savingsRate > 10 ? 'var(--amber)' : 'var(--red)'}
          desc={
            savingsRate > 20
              ? 'Excellent! Well above the 20% benchmark.'
              : savingsRate > 10
              ? 'Decent — aim above 20% for stronger financial health.'
              : 'Low savings rate. Review recurring expenses.'
          }
          delay={0.05}
        />
        <InsightMetric
          label="This Month Net"
          value={formatCurrency(thisIncome - thisExpense)}
          valueColor={(thisIncome - thisExpense) >= 0 ? 'var(--green)' : 'var(--red)'}
          desc={`Income: ${formatCurrency(thisIncome)} · Expenses: ${formatCurrency(thisExpense)}`}
          delay={0.1}
        />
      </div>

      {/* Monthly Comparison */}
      <Card>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
          This Month vs Last Month
        </h3>
        <CompBar label="This — Income"  value={thisIncome}  maxValue={maxComp} color="var(--amber)" />
        <CompBar label="Last — Income"  value={lastIncome}  maxValue={maxComp} color="var(--text3)" />
        <CompBar label="This — Expense" value={thisExpense} maxValue={maxComp} color="var(--red)"   />
        <CompBar label="Last — Expense" value={lastExpense} maxValue={maxComp} color="#7f1d1d"      />
      </Card>

      {/* Category Trend Chart */}
      <Card>
        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
          Category Spend Trend
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text3)' }}>Top 4 expense categories — last 6 months</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={catTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#5a6480', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#5a6480', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: 'var(--text2)', paddingTop: 12 }}
              iconType="square"
              iconSize={10}
            />
            {top4Cats.map((cat, i) => (
              <Bar
                key={cat}
                dataKey={cat}
                fill={catChartColors[i] + '40'}
                stroke={catChartColors[i]}
                strokeWidth={1.5}
                radius={[3, 3, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Smart Observations */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
          Smart Observations
        </p>
        <div className="flex flex-col gap-2.5">
          {observations.map((obs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ObsItem {...obs} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
