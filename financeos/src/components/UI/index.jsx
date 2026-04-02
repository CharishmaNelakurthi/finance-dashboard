import React from 'react'
import { motion } from 'framer-motion'

// ── Card ──────────────────────────────────────────────────────────
export function Card({ children, className = '', noPad = false }) {
  return (
    <div
      className={`rounded-xl border ${noPad ? '' : 'p-5'} ${className}`}
      style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────────
// Summary card with label, value, and optional trend pill
export function StatCard({ label, value, valueClass = '', trend, trendUp, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>
          {label}
        </p>
        <p className={`text-2xl font-semibold font-mono tracking-tight leading-none ${valueClass}`}>
          {value}
        </p>
        {trend && (
          <span
            className="inline-flex items-center gap-1 text-xs font-medium mt-3 px-2 py-0.5 rounded-full"
            style={{
              background: trendUp ? 'var(--green3)' : 'var(--red3)',
              color: trendUp ? 'var(--green)' : 'var(--red)',
            }}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </Card>
    </motion.div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────
export function Badge({ children, variant = 'amber' }) {
  const styles = {
    amber:  { background: 'var(--amber3)',  color: 'var(--amber)' },
    green:  { background: 'var(--green3)',  color: 'var(--green)' },
    red:    { background: 'var(--red3)',    color: 'var(--red)'   },
    subtle: { background: 'var(--bg4)',     color: 'var(--text2)' },
  }
  return (
    <span
      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
      style={styles[variant] || styles.amber}
    >
      {children}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) {
  const base = 'inline-flex items-center gap-1.5 text-sm font-medium rounded-lg px-3.5 py-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary:   'bg-amber-DEFAULT text-black hover:bg-amber-light',
    secondary: 'border hover:border-slate-500',
    danger:    'border',
    ghost:     'hover:bg-slate-800',
  }
  const inlineStyles = {
    primary:   { background: 'var(--amber)', color: '#000' },
    secondary: { background: 'var(--bg3)', borderColor: 'var(--border)', color: 'var(--text2)' },
    danger:    { background: 'var(--red3)', borderColor: 'var(--red)', color: 'var(--red)' },
    ghost:     { color: 'var(--text2)' },
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || ''} ${className}`}
      style={inlineStyles[variant]}
    >
      {children}
    </button>
  )
}

// ── EmptyState ────────────────────────────────────────────────────
export function EmptyState({ icon = '∅', title = 'No data', desc = '' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3" style={{ color: 'var(--text3)' }}>{icon}</div>
      <p className="text-sm font-medium mb-1" style={{ color: 'var(--text2)' }}>{title}</p>
      {desc && <p className="text-xs" style={{ color: 'var(--text3)' }}>{desc}</p>}
    </div>
  )
}

// ── SectionHeader ─────────────────────────────────────────────────
export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>{title}</h2>
      {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{subtitle}</p>}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────
export function Divider() {
  return <hr className="my-4" style={{ borderColor: 'var(--border)' }} />
}

// ── Input ─────────────────────────────────────────────────────────
export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium" style={{ color: 'var(--text2)' }}>{label}</label>}
      <input
        className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors duration-150"
        style={{
          background: 'var(--bg3)',
          border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
          color: 'var(--text)',
        }}
        {...props}
      />
      {error && <p className="text-xs" style={{ color: 'var(--red)' }}>{error}</p>}
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────
export function Select({ label, error, children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium" style={{ color: 'var(--text2)' }}>{label}</label>}
      <select
        className="w-full rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
        style={{
          background: 'var(--bg3)',
          border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
          color: 'var(--text)',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs" style={{ color: 'var(--red)' }}>{error}</p>}
    </div>
  )
}
