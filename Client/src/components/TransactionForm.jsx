import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TransactionForm({ onSubmit, type }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
  const expenseCategories = ['Rent', 'Groceries', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Other'];
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    onSubmit({ amount: parseFloat(amount), category, date });
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50 text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Amount</label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
          min="0"
          step="0.01"
          required
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
          required
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className={`w-full py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-colors ${
          type === 'income'
            ? 'bg-accent-500 hover:bg-accent-600'
            : 'bg-danger-500 hover:bg-danger-600'
        }`}
      >
        Add {type === 'income' ? 'Income' : 'Expense'}
      </motion.button>
    </form>
  );
}
