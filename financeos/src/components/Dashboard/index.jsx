import React from 'react'
import { motion } from 'framer-motion'
import { useFinanceStore } from '../../store/useFinanceStore'
import { StatCard } from '../UI'
import BalanceTrendChart from './BalanceTrendChart'
import SpendingPieChart from './SpendingPieChart'
import { formatCurrency } from '../../utils/helpers'

export default function Dashboard() {
  const getSummary = useFinanceStore((s) => s.getSummary)
  const { income, expense, balance } = getSummary()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Balance"
          value={formatCurrency(balance)}
          valueClass="text-amber-DEFAULT"
          trend="+12% vs last month"
          trendUp
          delay={0}
        />
        <StatCard
          label="Total Income"
          value={formatCurrency(income)}
          valueClass=""
          trend="+8% vs last month"
          trendUp
          delay={0.05}
        />
        <StatCard
          label="Total Expenses"
          value={formatCurrency(expense)}
          valueClass=""
          trend="-5% vs last month"
          trendUp={false}
          delay={0.1}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <SpendingPieChart />
        </div>
      </div>
    </motion.div>
  )
}
