// ── Number / Currency Formatters ─────────────────────────────────
export const formatCurrency = (val, compact = false) => {
  if (compact && Math.abs(val) >= 1000) {
    return '$' + (Math.abs(val) / 1000).toFixed(1) + 'k'
  }
  return '$' + Math.abs(val).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const formatPct = (val) => `${val > 0 ? '+' : ''}${val}%`

// ── Date Helpers ─────────────────────────────────────────────────
export const formatDate = (iso) => {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const getTodayISO = () => new Date().toISOString().slice(0, 10)

// ── Math Helpers ─────────────────────────────────────────────────
export const pctChange = (current, prev) =>
  prev === 0 ? 0 : Math.round(((current - prev) / prev) * 100)

// ── CSV Export ────────────────────────────────────────────────────
export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) =>
    [t.date, `"${t.desc}"`, t.cat, t.type, t.amount].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ── JSON Export ───────────────────────────────────────────────────
export const exportToJSON = (transactions, filename = 'transactions.json') => {
  const json = JSON.stringify(transactions, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ── Insights Helpers ──────────────────────────────────────────────

// Returns transactions for a given month index (0=Jan) and year
export const filterByMonth = (transactions, month, year) =>
  transactions.filter((t) => {
    const d = new Date(t.date)
    return d.getMonth() === month && d.getFullYear() === year
  })

// Sum income or expense from an array of transactions
export const sumBy = (transactions, type) =>
  transactions
    .filter((t) => t.type === type)
    .reduce((s, t) => s + t.amount, 0)
