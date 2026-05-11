import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import AnimatedModal from '../components/AnimatedModal';
import TransactionForm from '../components/TransactionForm';
import { CategoryPieChart } from '../components/Charts';

export default function Income() {
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const totalIncome = state.incomes.reduce((sum, i) => sum + i.amount, 0);
  const sortedIncomes = [...state.incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAddIncome = (data) => {
    dispatch({ type: 'ADD_INCOME', payload: data });
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
              Income
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-surface-500 mt-1"
            >
              Track your earnings
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold text-sm cursor-pointer border-none transition-colors shadow-lg shadow-accent-500/25"
          >
            + Add Income
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Income" amount={totalIncome} icon="+" color="accent" delay={0} />
          <StatCard
            title="This Month"
            amount={state.incomes
              .filter((i) => new Date(i.date).getMonth() + 1 === new Date().getMonth() + 1)
              .reduce((sum, i) => sum + i.amount, 0)}
            icon="$"
            color="accent"
            delay={0.1}
          />
          <StatCard
            title="Transactions"
            amount={state.incomes.length}
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
            <h2 className="text-lg font-semibold text-surface-900 mb-6">Income by Category</h2>
            <CategoryPieChart data={state.incomes} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Recent Income</h2>
            <TransactionList items={sortedIncomes} type="income" />
          </motion.div>
        </div>

        <AnimatedModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Income"
        >
          <TransactionForm onSubmit={handleAddIncome} type="income" />
        </AnimatedModal>
      </div>
    </PageTransition>
  );
}
