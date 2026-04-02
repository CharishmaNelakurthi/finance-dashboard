# FinanceOS — Finance Dashboard

A clean, modern, fully-featured finance dashboard built with **React + Vite + Tailwind CSS + Zustand + Recharts + Framer Motion**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Zustand | Global state management |
| Recharts | Data visualization (Area, Pie, Bar charts) |
| Framer Motion | Page transitions & micro-animations |

---

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── index.jsx            # Dashboard page — stat cards + charts
│   │   ├── BalanceTrendChart.jsx # Area chart (income vs expense trend)
│   │   └── SpendingPieChart.jsx  # Doughnut chart (category breakdown)
│   ├── Transactions/
│   │   ├── index.jsx            # Transactions page wrapper
│   │   ├── TransactionTable.jsx # Table with search/filter/sort/CRUD
│   │   └── TransactionModal.jsx # Add/edit modal form
│   ├── Insights/
│   │   └── index.jsx            # Insights: metrics, comparison, observations
│   ├── Layout/
│   │   ├── Sidebar.jsx          # Navigation sidebar with role switcher
│   │   └── Topbar.jsx           # Top header bar
│   └── UI/
│       └── index.jsx            # Shared primitives: Card, Button, Badge, Input...
├── store/
│   └── useFinanceStore.js       # Zustand store — all state + actions + selectors
├── data/
│   └── mockData.js              # Mock transactions, chart data, color map
├── hooks/
│   └── useTransactionForm.js    # Controlled form state + validation logic
├── utils/
│   └── helpers.js               # formatCurrency, exportCSV, date utils, pctChange
├── App.jsx                      # Root layout, section routing, modal orchestration
├── main.jsx                     # React entry point
└── index.css                    # Design tokens (CSS vars), global styles
```

---

## Architecture Decisions

### State Management (Zustand)
All application state lives in a single Zustand store (`useFinanceStore`):
- **Data**: `transactions[]`, `nextId`
- **Filters**: `searchQuery`, `typeFilter`, `sortField`, `sortDir`
- **UI**: `role`, `darkMode`, `activeSection`
- **Selectors**: `getFilteredTransactions()`, `getSummary()`, `getCategoryBreakdown()` are methods on the store, keeping derived logic co-located with state
- **Persistence**: `zustand/middleware/persist` saves to `localStorage` automatically — transactions and preferences survive page refresh

### Role-Based UI
- Role is stored in Zustand (`viewer` | `admin`)
- Components read `role` directly from the store and conditionally render admin controls
- No routing changes — same URL, different capabilities
- Switch role via the sidebar dropdown

### Component Design
- **Primitive-first**: `Card`, `Button`, `Badge`, `Input`, `Select` in `UI/index.jsx` — reused everywhere, styled with CSS variables (no Tailwind hardcoding)
- **Page components** are thin wrappers that assemble primitives; data logic stays in the store or utils
- **`useTransactionForm` hook** isolates form state and validation from the modal UI

### Styling
- **CSS variables** in `:root` define the full dark/light palette — toggling `.dark` on `<html>` switches modes
- **Tailwind** handles spacing, layout, responsive grid — not colors (those come from CSS vars)
- **`DM Sans` + `DM Mono`** — editorial fintech aesthetic; mono for all currency values

### Data Visualization
- **Recharts** with custom tooltips for every chart — no default Recharts legend used
- Area chart for trend (income + expense over 12 months)
- Doughnut for category breakdown with inline legend
- Grouped bar chart in Insights for category trends

---

## Features

- ✅ Dashboard with 3 stat cards, area chart, doughnut chart
- ✅ Transaction table with live search, type filter, sort by date/amount
- ✅ Color-coded rows (green income / red expense)
- ✅ Role-based UI: Admin can add, edit, delete; Viewer is read-only
- ✅ Add/Edit modal with validation
- ✅ Insights: top category, savings rate, monthly comparison, smart observations, category trend
- ✅ Dark/light mode toggle (persisted)
- ✅ Data persisted to localStorage via Zustand
- ✅ CSV export
- ✅ Framer Motion page transitions and row animations
- ✅ Fully responsive (mobile drawer sidebar, stacking grid)
- ✅ Empty states for filtered results

---

## Customization

**Add a new category**: Edit `CATEGORIES` array in `src/data/mockData.js` and add a color entry to `CAT_COLORS`.

**Change mock data**: Edit `MOCK_TRANSACTIONS` in `src/data/mockData.js`. To reset to defaults, clear `localStorage` key `financeos-storage`.

**Add a new section**: Create a component in `src/components/`, add it to the `NAV_ITEMS` array in `Sidebar.jsx`, and register it in `App.jsx`'s `sections` map.
