import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useFinanceStore } from './store/useFinanceStore'
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Insights from './components/Insights'
import TransactionModal from './components/Transactions/TransactionModal'

export default function App() {
  const { activeSection, darkMode } = useFinanceStore()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)

  // Sync dark mode class on mount and on change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileSidebarOpen((v) => !v)
    } else {
      setSidebarCollapsed((v) => !v)
    }
  }

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 768) setMobileSidebarOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const sections = { dashboard: Dashboard, transactions: Transactions, insights: Insights }
  const ActiveSection = sections[activeSection] || Dashboard

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop: inline, mobile: fixed drawer */}
      <div
        className={`
          flex-shrink-0 transition-all duration-200
          md:relative md:translate-x-0
          fixed inset-y-0 left-0 z-50 md:z-auto
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ width: sidebarCollapsed ? 64 : 220 }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          onToggleSidebar={toggleSidebar}
          onAddTransaction={() => setAddModalOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          <AnimatePresence mode="wait">
            <ActiveSection key={activeSection} />
          </AnimatePresence>
        </main>
      </div>

      {/* Global Add Transaction Modal */}
      <TransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  )
}
