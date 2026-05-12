import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";

export default function Navbar() {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const respponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }

    dispatch({ type: "LOGOUT" });
  };

  const navLinks = state.isAuthenticated
    ? [
        { to: "/", label: "Home" },
        { to: "/income", label: "Income" },
        { to: "/expense", label: "Expense" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-4 h-4 bg-white rounded-full"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </div>

          <p className="text-white mt-6 text-lg font-semibold tracking-wide">
            Logging out...
          </p>
        </div>
      )}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.403 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.403-2.599-1"
                  />
                </svg>
              </motion.div>
              <span className="text-xl font-bold text-surface-900 tracking-tight">
                FinTrack
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="no-underline">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "text-primary-600"
                        : "text-surface-600 hover:text-surface-900"
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.to && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary-50 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}

              {state.isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="ml-2 px-5 py-2.5 text-sm font-medium text-danger-600 bg-danger-50 rounded-lg hover:bg-danger-100 transition-colors cursor-pointer border-none"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
