import React from 'react'
import { motion } from 'framer-motion'
import TransactionTable from './TransactionTable'

export default function Transactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <TransactionTable />
    </motion.div>
  )
}
