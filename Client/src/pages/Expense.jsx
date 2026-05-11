import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import AnimatedModal from '../components/AnimatedModal';
import TransactionForm from '../components/TransactionForm';
import { CategoryPieChart } from '../components/Charts';

export default function Expense() {
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const totalExpense = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const sortedExpenses = [...state.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAddExpense = (data) => {
    dispatch({ type: 'ADD_EXPENSE', payload: data });
    setModalOpen(false);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-3xl font-bold text-surface-900"
            >
              Expenses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-surface-500 mt-1"
            >
              Monitor your spending
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-danger-500 hover:bg-danger-600 text-white rounded-xl font-semibold text-sm cursor-pointer border-none transition-colors shadow-lg shadow-danger-500/25"
          >
            + Add Expense
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Expenses" amount={totalExpense} icon="-" color="danger" delay={0} />
          <StatCard
            title="This Month"
            amount={state.expenses
              .filter((e) => new Date(e.date).getMonth() + 1 === new Date().getMonth() + 1)
              .reduce((sum, e) => sum + e.amount, 0)}
            icon="$"
            color="danger"
            delay={0.1}
          />
          <StatCard
            title="Transactions"
            amount={state.expenses.length}
            icon="#"
            color="primary"
            delay={0.2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-surface-900 mb-6">Expenses by Category</h2>
            <CategoryPieChart data={state.expenses} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Recent Expenses</h2>
            <TransactionList items={sortedExpenses} type="expense" />
          </motion.div>
        </div>

        <AnimatedModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Expense"
        >
          <TransactionForm onSubmit={handleAddExpense} type="expense" />
        </AnimatedModal>
      </div>
    </PageTransition>
  );
}
