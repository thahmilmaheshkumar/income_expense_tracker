import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import PageTransition from "../components/PageTransition";
import axios from "axios";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const { dispatch, initialState } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { name: email, password },
        { withCredentials: true },
      );
      console.log(response);

      const income_expense = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/all`,
        { withCredentials: true },
      );

      initialState.incomes = income_expense.data.income;
      initialState.expenses = income_expense.data.expense;

      console.log("initialState", initialState);

      dispatch({ type: "LOGIN", payload: response.data });

      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      console.log("Login failed:", error.response);
    }
    navigate("/");
  };

  const inputClass = "ui-input";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-surface-100 overflow-hidden">
            <div className="px-8 pt-10 pb-2 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-surface-900">
                Welcome back
              </h1>
              <p className="text-surface-500 mt-2 text-sm">
                Sign in to your account
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-8 py-8 flex flex-col gap-5"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(37,99,235,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="ui-btn ui-btn-primary w-full"
              >
                Sign In
              </motion.button>
            </form>

            <div className="px-8 pb-8 text-center">
              <p className="text-sm text-surface-500">
                Don't have an account?{" "}
                <a href="/register" className="ui-tag-link">
                  Register
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
