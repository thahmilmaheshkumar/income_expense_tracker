import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import PageTransition from "../components/PageTransition";
import StatCard from "../components/StatCard";
import AnimatedModal from "../components/AnimatedModal";
import TransactionForm from "../components/TransactionForm";
import { IncomeExpenseChart } from "../components/Charts";
import axios from "axios";

export default function Home() {
  const { state, dispatch, initializeState } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("income");

  const totalIncome = state.incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const currentMonth = new Date().getMonth() + 1;
  const monthlyIncome = state.incomes
    .filter((i) => new Date(i.date).getMonth() + 1 === currentMonth)
    .reduce((sum, i) => sum + i.amount, 0);
  const monthlyExpense = state.expenses
    .filter((e) => new Date(e.date).getMonth() + 1 === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  const handleAddTransaction = async (data) => {
    console.log("data", data);
    if (transactionType === "income") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tracker/add`,
          {
            amount: data.amount,
            category: data.category,
            role: "income",
          },
          { withCredentials: true },
        );

        console.log("Income added successfully:", response.data);

        const income_expense = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/all`,
          { withCredentials: true },
        );

        state.incomes = income_expense.data.income;
        state.expenses = income_expense.data.expense;
      } catch (error) {
        console.log("Error adding income:", error.response);
      }
      dispatch({ type: "ADD_INCOME", payload: data });
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tracker/add`,
          {
            amount: data.amount,
            category: data.category,
            role: "expense",
          },
          { withCredentials: true },
        );

        console.log("Expense added successfully:", response.data);

        const income_expense = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/all`,
          { withCredentials: true },
        );

        state.incomes = income_expense.data.income;
        state.expenses = income_expense.data.expense;
      } catch (error) {
        console.log("Error adding expense:", error.response);
      }

      dispatch({ type: "ADD_EXPENSE", payload: data });
    }
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
              Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-surface-500 mt-1"
            >
              Your financial overview
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm cursor-pointer border-none transition-colors shadow-lg shadow-primary-500/25"
          >
            + Add Transaction
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Balance"
            amount={balance}
            icon="₹"
            color="primary"
            delay={0}
          />
          <StatCard
            title="Monthly Income"
            amount={monthlyIncome}
            icon="+"
            color="accent"
            delay={0.1}
          />
          <StatCard
            title="Monthly Expense"
            amount={monthlyExpense}
            icon="-"
            color="danger"
            delay={0.2}
          />
        </div>

        <AnimatedModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Transaction"
        >
          <div className="flex gap-2 mb-6">
            {["income", "expense"].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTransactionType(type)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none transition-colors ${
                  transactionType === type
                    ? type === "income"
                      ? "bg-accent-500 text-white"
                      : "bg-danger-500 text-white"
                    : "bg-surface-100 text-surface-500"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>
          <TransactionForm
            onSubmit={handleAddTransaction}
            type={transactionType}
          />
        </AnimatedModal>
      </div>
    </PageTransition>
  );
}
