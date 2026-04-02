import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinanceStore } from '../../store/useFinanceStore'
import { CAT_COLORS } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { EmptyState, Badge } from '../UI'
import TransactionModal from './TransactionModal'

// ── TransactionTable ──────────────────────────────────────────────
export default function TransactionTable() {
  const {
    role,
    searchQuery, setSearch,
    typeFilter, setTypeFilter,
    sortField, sortDir, setSort,
    getFilteredTransactions,
    deleteTransaction,
    transactions,
  } = useFinanceStore()

  const [editTxn, setEditTxn] = useState(null)
  const filtered = getFilteredTransactions()

  const SortArrow = ({ field }) => {
    if (sortField !== field) return <span style={{ color: 'var(--text3)', marginLeft: 3 }}>↕</span>
    return (
      <span style={{ color: 'var(--amber)', marginLeft: 3 }}>
        {sortDir === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  const thStyle = {
    padding: '10px 16px',
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--text3)',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap',
  }

  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: 'var(--text3)' }}
          >⌕</span>
          <input
            type="text"
            placeholder="Search by category or description..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg pl-8 pr-3 py-2 text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          />
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--bg2)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead>
              <tr style={{ background: 'var(--bg3)' }}>
                <th style={{ ...thStyle, width: 110 }}>Date</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, width: 140 }}>Category</th>
                <th style={{ ...thStyle, width: 90 }}>Type</th>
                <th
                  style={{ ...thStyle, width: 120, cursor: 'pointer' }}
                  onClick={() => setSort('amount')}
                >
                  Amount <SortArrow field="amount" />
                </th>
                <th
                  style={{ ...thStyle, width: 110, cursor: 'pointer' }}
                  onClick={() => setSort('date')}
                >
                  Date <SortArrow field="date" />
                </th>
                {role === 'admin' && (
                  <th style={{ ...thStyle, width: 100 }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={role === 'admin' ? 7 : 6}>
                    <EmptyState
                      title="No transactions found"
                      desc="Try adjusting your search or filters"
                    />
                  </td>
                </tr>
              ) : (
                <AnimatePresence initial={false}>
                  {filtered.map((txn, i) => (
                    <motion.tr
                      key={txn.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      style={{ borderBottom: '1px solid var(--border)' }}
                      className="transition-colors duration-100"
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg3)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Date (compact) */}
                      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text3)', fontFamily: 'DM Mono, monospace' }}>
                        {txn.date}
                      </td>

                      {/* Description */}
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {txn.desc}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text2)' }}>
                          <span
                            className="w-2 h-2 rounded-sm flex-shrink-0"
                            style={{ background: CAT_COLORS[txn.cat] || '#64748b' }}
                          />
                          {txn.cat}
                        </span>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant={txn.type === 'income' ? 'green' : 'red'}>
                          {txn.type}
                        </Badge>
                      </td>

                      {/* Amount */}
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          fontFamily: 'DM Mono, monospace',
                          fontWeight: 500,
                          color: txn.type === 'income' ? 'var(--green)' : 'var(--red)',
                        }}
                      >
                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </td>

                      {/* Date (full) */}
                      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text3)' }}>
                        {formatDate(txn.date)}
                      </td>

                      {/* Admin actions */}
                      {role === 'admin' && (
                        <td style={{ padding: '12px 16px' }}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditTxn(txn)}
                              className="text-xs px-2.5 py-1 rounded-md transition-all"
                              style={{ background: 'var(--bg4)', border: '1px solid var(--border)', color: 'var(--text2)' }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Delete this transaction?')) deleteTransaction(txn.id)
                              }}
                              className="text-xs px-2.5 py-1 rounded-md transition-all"
                              style={{ background: 'var(--red3)', border: '1px solid var(--red)', color: 'var(--red)' }}
                            >
                              Del
                            </button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div
          className="px-4 py-2.5 text-xs text-right"
          style={{ color: 'var(--text3)', borderTop: '1px solid var(--border)' }}
        >
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      </div>

      {/* Edit Modal */}
      <TransactionModal
        isOpen={!!editTxn}
        onClose={() => setEditTxn(null)}
        editTxn={editTxn}
      />
    </>
  )
}
