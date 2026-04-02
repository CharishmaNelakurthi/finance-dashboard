import { useState } from 'react'
import { getTodayISO } from '../utils/helpers'
import { CATEGORIES } from '../data/mockData'

const EMPTY_FORM = {
  desc: '',
  amount: '',
  type: 'expense',
  cat: CATEGORIES[0],
  date: getTodayISO(),
}

// ── useTransactionForm ────────────────────────────────────────────
// Manages controlled form state, validation, and reset logic
// for the Add / Edit transaction modal.
// ──────────────────────────────────────────────────────────────────
export function useTransactionForm(initialValues = null) {
  const [values, setValues] = useState(initialValues || EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }))
    // Clear error on change
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!values.desc.trim())       errs.desc   = 'Description is required'
    if (!values.amount || isNaN(Number(values.amount)) || Number(values.amount) <= 0)
                                    errs.amount = 'Enter a valid amount'
    if (!values.date)              errs.date   = 'Date is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const reset = () => {
    setValues(EMPTY_FORM)
    setErrors({})
  }

  const getPayload = () => ({
    desc:   values.desc.trim(),
    amount: parseFloat(values.amount),
    type:   values.type,
    cat:    values.cat,
    date:   values.date,
  })

  return { values, set, errors, validate, reset, getPayload }
}
