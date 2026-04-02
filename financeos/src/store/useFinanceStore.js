import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_TRANSACTIONS } from '../data/mockData'

// ── Finance Store ─────────────────────────────────────────────────
// Single source of truth for: transactions, UI filters, role, theme.
// Persisted to localStorage via zustand/middleware.
// ──────────────────────────────────────────────────────────────────
export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // ── Data ────────────────────────────────────────────────────
      transactions: MOCK_TRANSACTIONS,
      nextId: 100,

      // ── UI State ─────────────────────────────────────────────────
      role: 'viewer',       // 'viewer' | 'admin'
      darkMode: true,
      activeSection: 'dashboard',

      // ── Filter / Sort State ──────────────────────────────────────
      searchQuery: '',
      typeFilter: 'all',    // 'all' | 'income' | 'expense'
      sortField: 'date',    // 'date' | 'amount'
      sortDir: 'desc',      // 'asc' | 'desc'

      // ── Actions ──────────────────────────────────────────────────
      setRole: (role) => set({ role }),
      setSection: (section) => set({ activeSection: section }),
      toggleDarkMode: () => {
        const next = !get().darkMode
        set({ darkMode: next })
        // Apply/remove 'dark' class on <html>
        document.documentElement.classList.toggle('dark', next)
      },

      setSearch: (q) => set({ searchQuery: q }),
      setTypeFilter: (f) => set({ typeFilter: f }),
      setSort: (field) => {
        const { sortField, sortDir } = get()
        if (sortField === field) {
          set({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' })
        } else {
          set({ sortField: field, sortDir: 'desc' })
        }
      },

      addTransaction: (txn) =>
        set((s) => ({
          transactions: [{ ...txn, id: s.nextId }, ...s.transactions],
          nextId: s.nextId + 1,
        })),

      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // ── Selectors (derived from state) ───────────────────────────
      // Filtered + sorted transactions for the table
      getFilteredTransactions: () => {
        const { transactions, searchQuery, typeFilter, sortField, sortDir } = get()
        let data = [...transactions]

        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          data = data.filter(
            (t) =>
              t.cat.toLowerCase().includes(q) ||
              t.desc.toLowerCase().includes(q)
          )
        }

        if (typeFilter !== 'all') {
          data = data.filter((t) => t.type === typeFilter)
        }

        data.sort((a, b) => {
          const mult = sortDir === 'asc' ? 1 : -1
          if (sortField === 'date') {
            return (new Date(a.date) - new Date(b.date)) * mult
          }
          return (a.amount - b.amount) * mult
        })

        return data
      },

      // Summary totals
      getSummary: () => {
        const { transactions } = get()
        const income  = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
        const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        return { income, expense, balance: income - expense }
      },

      // Spending by category (for pie chart)
      getCategoryBreakdown: () => {
        const { transactions } = get()
        const map = {}
        transactions
          .filter((t) => t.type === 'expense')
          .forEach((t) => { map[t.cat] = (map[t.cat] || 0) + t.amount })
        return Object.entries(map)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, amount]) => ({ cat, amount }))
      },
    }),
    {
      name: 'financeos-storage',
      // Only persist data + preferences, not transient UI state
      partialize: (s) => ({
        transactions: s.transactions,
        nextId: s.nextId,
        darkMode: s.darkMode,
        role: s.role,
      }),
    }
  )
)
