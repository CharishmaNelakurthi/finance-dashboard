import React from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'
import { Badge, Button } from '../UI'
import { exportToCSV } from '../../utils/helpers'

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Overview of your finances' },
  transactions: { title: 'Transactions', sub: 'Browse and manage all records' },
  insights: { title: 'Insights', sub: 'Smart analysis of your spending' },
}

export default function Topbar({ onToggleSidebar, onAddTransaction }) {
  const { activeSection, role, darkMode, toggleDarkMode, transactions } = useFinanceStore()
  const { title, sub } = PAGE_TITLES[activeSection] || PAGE_TITLES.dashboard

  return (
    <header
      className="flex items-center justify-between px-5 py-3.5 gap-3"
      style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg transition-colors duration-150"
          style={{ color: 'var(--text3)' }}
          title="Toggle sidebar"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div>
          <h1 className="text-sm font-semibold leading-none" style={{ color: 'var(--text)' }}>
            {title}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{sub}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <Badge variant={role === 'admin' ? 'amber' : 'green'}>
          {role === 'admin' ? '⚡ Admin' : '👁 Viewer'}
        </Badge>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg text-sm transition-colors duration-150"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}
          title="Toggle dark mode"
        >
          {darkMode ? '☀' : '☾'}
        </button>

        {/* Export (transactions section) */}
        {activeSection === 'transactions' && (
          <Button variant="secondary" onClick={() => exportToCSV(transactions)}>
            ↓ Export CSV
          </Button>
        )}

        {/* Add transaction (admin only) */}
        {role === 'admin' && (
          <Button variant="primary" onClick={onAddTransaction}>
            + Add
          </Button>
        )}
      </div>
    </header>
  )
}
