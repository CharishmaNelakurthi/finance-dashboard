// ── Mock Transactions ────────────────────────────────────────────
export const MOCK_TRANSACTIONS = [
  { id: 1,  date: '2024-11-01', desc: 'Monthly Salary',      cat: 'Salary',        type: 'income',  amount: 5200 },
  { id: 2,  date: '2024-11-02', desc: 'Apartment Rent',      cat: 'Housing',       type: 'expense', amount: 1400 },
  { id: 3,  date: '2024-11-03', desc: 'Grocery Store',       cat: 'Food',          type: 'expense', amount: 180  },
  { id: 4,  date: '2024-11-05', desc: 'Netflix',             cat: 'Entertainment', type: 'expense', amount: 18   },
  { id: 5,  date: '2024-11-07', desc: 'Freelance Project',   cat: 'Freelance',     type: 'income',  amount: 850  },
  { id: 6,  date: '2024-11-08', desc: 'Bus Pass',            cat: 'Transport',     type: 'expense', amount: 55   },
  { id: 7,  date: '2024-11-10', desc: 'Doctor Visit',        cat: 'Healthcare',    type: 'expense', amount: 120  },
  { id: 8,  date: '2024-11-12', desc: 'Amazon Shopping',     cat: 'Shopping',      type: 'expense', amount: 230  },
  { id: 9,  date: '2024-11-13', desc: 'Electricity Bill',    cat: 'Utilities',     type: 'expense', amount: 95   },
  { id: 10, date: '2024-11-15', desc: 'Dinner Out',          cat: 'Food',          type: 'expense', amount: 75   },
  { id: 11, date: '2024-11-17', desc: 'Gym Membership',      cat: 'Healthcare',    type: 'expense', amount: 45   },
  { id: 12, date: '2024-11-19', desc: 'Spotify',             cat: 'Entertainment', type: 'expense', amount: 12   },
  { id: 13, date: '2024-11-21', desc: 'Freelance Invoice',   cat: 'Freelance',     type: 'income',  amount: 1200 },
  { id: 14, date: '2024-11-22', desc: 'Coffee & Cafe',       cat: 'Food',          type: 'expense', amount: 62   },
  { id: 15, date: '2024-11-24', desc: 'Clothing Store',      cat: 'Shopping',      type: 'expense', amount: 145  },
  { id: 16, date: '2024-11-25', desc: 'Internet Bill',       cat: 'Utilities',     type: 'expense', amount: 60   },
  { id: 17, date: '2024-11-26', desc: 'Uber Rides',          cat: 'Transport',     type: 'expense', amount: 88   },
  { id: 18, date: '2024-11-28', desc: 'Dividend Income',     cat: 'Other',         type: 'income',  amount: 310  },
  { id: 19, date: '2024-10-01', desc: 'Monthly Salary',      cat: 'Salary',        type: 'income',  amount: 5200 },
  { id: 20, date: '2024-10-02', desc: 'Apartment Rent',      cat: 'Housing',       type: 'expense', amount: 1400 },
  { id: 21, date: '2024-10-05', desc: 'Grocery Store',       cat: 'Food',          type: 'expense', amount: 165  },
  { id: 22, date: '2024-10-08', desc: 'Freelance Work',      cat: 'Freelance',     type: 'income',  amount: 600  },
  { id: 23, date: '2024-10-10', desc: 'Movie Theater',       cat: 'Entertainment', type: 'expense', amount: 38   },
  { id: 24, date: '2024-10-14', desc: 'Gas',                 cat: 'Transport',     type: 'expense', amount: 70   },
  { id: 25, date: '2024-10-18', desc: 'Shopping Mall',       cat: 'Shopping',      type: 'expense', amount: 310  },
  { id: 26, date: '2024-10-22', desc: 'Pharmacy',            cat: 'Healthcare',    type: 'expense', amount: 55   },
  { id: 27, date: '2024-10-25', desc: 'Internet Bill',       cat: 'Utilities',     type: 'expense', amount: 60   },
  { id: 28, date: '2024-10-29', desc: 'Electricity',         cat: 'Utilities',     type: 'expense', amount: 102  },
  { id: 29, date: '2024-09-01', desc: 'Monthly Salary',      cat: 'Salary',        type: 'income',  amount: 5200 },
  { id: 30, date: '2024-09-02', desc: 'Apartment Rent',      cat: 'Housing',       type: 'expense', amount: 1400 },
  { id: 31, date: '2024-09-07', desc: 'Freelance Project',   cat: 'Freelance',     type: 'income',  amount: 1100 },
  { id: 32, date: '2024-09-10', desc: 'Grocery Store',       cat: 'Food',          type: 'expense', amount: 195  },
  { id: 33, date: '2024-09-15', desc: 'Online Shopping',     cat: 'Shopping',      type: 'expense', amount: 275  },
  { id: 34, date: '2024-09-20', desc: 'Gym Membership',      cat: 'Healthcare',    type: 'expense', amount: 45   },
  { id: 35, date: '2024-09-25', desc: 'Utilities',           cat: 'Utilities',     type: 'expense', amount: 155  },
]

// ── Monthly Chart Data ────────────────────────────────────────────
export const MONTHLY_DATA = [
  { month: 'Jan', income: 3800, expense: 2900 },
  { month: 'Feb', income: 4200, expense: 3100 },
  { month: 'Mar', income: 4000, expense: 2800 },
  { month: 'Apr', income: 4500, expense: 3400 },
  { month: 'May', income: 4800, expense: 3200 },
  { month: 'Jun', income: 5000, expense: 3500 },
  { month: 'Jul', income: 4600, expense: 3100 },
  { month: 'Aug', income: 5100, expense: 3800 },
  { month: 'Sep', income: 5400, expense: 3600 },
  { month: 'Oct', income: 5200, expense: 3400 },
  { month: 'Nov', income: 7560, expense: 2585 },
  { month: 'Dec', income: 5800, expense: 3100 },
]

// ── Category Color Map ────────────────────────────────────────────
export const CAT_COLORS = {
  Food:          '#f5a623',
  Housing:       '#3b82f6',
  Transport:     '#2dd4bf',
  Entertainment: '#a78bfa',
  Healthcare:    '#22c55e',
  Shopping:      '#fb923c',
  Utilities:     '#64748b',
  Salary:        '#22c55e',
  Freelance:     '#38bdf8',
  Other:         '#94a3b8',
}

// ── All Categories ────────────────────────────────────────────────
export const CATEGORIES = [
  'Food', 'Housing', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Other',
]
