import React from 'react'
import { motion } from 'framer-motion'
import { useFinanceStore } from '../../store/useFinanceStore'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
]

export default function Sidebar({ collapsed, onClose }) {
  const { activeSection, setSection, role, setRole } = useFinanceStore()

  const handleNav = (id) => {
    setSection(id)
    if (onClose) onClose() // close mobile drawer
  }

  return (
    <aside
      className="flex flex-col h-full"
      style={{ background: 'var(--bg2)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-black flex-shrink-0"
          style={{ background: 'var(--amber)' }}
        >
          F
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            FinanceOS
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2">
        {NAV_ITEMS.map((item) => {
          const active = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-normal transition-all duration-150 text-left relative"
              style={{
                background: active ? 'var(--amber3)' : 'transparent',
                color: active ? 'var(--amber)' : 'var(--text2)',
                fontWeight: active ? 500 : 400,
              }}
            >
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'var(--amber3)' }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Role Selector */}
      <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
        {!collapsed && (
          <p className="text-xs mb-2 px-1" style={{ color: 'var(--text3)' }}>
            Role
          </p>
        )}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-lg px-2.5 py-2 text-xs outline-none cursor-pointer"
          style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            color: 'var(--text2)',
          }}
          title="Switch role"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚡ Admin</option>
        </select>
      </div>
    </aside>
  )
}
