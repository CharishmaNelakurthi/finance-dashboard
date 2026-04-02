import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinanceStore } from '../../store/useFinanceStore'
import { useTransactionForm } from '../../hooks/useTransactionForm'
import { Button, Input, Select } from '../UI'
import { CATEGORIES } from '../../data/mockData'

// ── TransactionModal ──────────────────────────────────────────────
// Handles both "add" (editTxn=null) and "edit" (editTxn={...}) modes.
// ──────────────────────────────────────────────────────────────────
export default function TransactionModal({ isOpen, onClose, editTxn = null }) {
  const { addTransaction, updateTransaction } = useFinanceStore()
  const { values, set, errors, validate, reset, getPayload } = useTransactionForm(
    editTxn
      ? { desc: editTxn.desc, amount: String(editTxn.amount), type: editTxn.type, cat: editTxn.cat, date: editTxn.date }
      : null
  )

  // Reset form whenever modal opens/changes target
  useEffect(() => {
    if (isOpen && !editTxn) reset()
  }, [isOpen, editTxn])

  const handleSave = () => {
    if (!validate()) return
    const payload = getPayload()
    if (editTxn) {
      updateTransaction(editTxn.id, payload)
    } else {
      addTransaction(payload)
    }
    onClose()
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdrop}
        >
          <motion.div
            className="w-full max-w-md rounded-xl p-6 shadow-2xl"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border2)' }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                {editTxn ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <button
                onClick={onClose}
                className="text-lg leading-none transition-colors"
                style={{ color: 'var(--text3)' }}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3.5">
              <Input
                label="Description"
                placeholder="e.g. Netflix subscription"
                value={values.desc}
                onChange={(e) => set('desc', e.target.value)}
                error={errors.desc}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Amount ($)"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={values.amount}
                  onChange={(e) => set('amount', e.target.value)}
                  error={errors.amount}
                />
                <Select
                  label="Type"
                  value={values.type}
                  onChange={(e) => set('type', e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Category"
                  value={values.cat}
                  onChange={(e) => set('cat', e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
                <Input
                  label="Date"
                  type="date"
                  value={values.date}
                  onChange={(e) => set('date', e.target.value)}
                  error={errors.date}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2.5 mt-5">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>
                {editTxn ? 'Save Changes' : 'Add Transaction'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
