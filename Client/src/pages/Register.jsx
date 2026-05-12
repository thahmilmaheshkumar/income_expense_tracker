import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import PageTransition from "../components/PageTransition";
import axios from "axios";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true },
      );
      console.log(response);
      navigate("/");
      dispatch({ type: "REGISTER", payload: { name, email } });
      toast.success("Registration successful");
    } catch (error) {
      console.log("Registration failed:", error.response);
      toast.error(error.response.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "ui-input";

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
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
                className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-surface-900">
                Create account
              </h1>
              <p className="text-surface-500 mt-2 text-sm">
                Start tracking your finances
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
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(34,197,94,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`ui-btn ui-btn-accent w-full ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <div className="px-8 pb-8 text-center">
              <p className="text-sm text-surface-500">
                Already have an account?{" "}
                <a href="/login" className="ui-tag-link">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
