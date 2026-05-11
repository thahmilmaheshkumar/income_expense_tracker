import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const { state } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/all`,
          { withCredentials: true },
        );

        console.log("Fetched data:", response);

        state.isAuthenticated = true;
        navigate("/");
        state.incomes = response.data.income;
        state.expenses = response.data.expense;
      } catch (error) {
        console.log("Error fetching data:", error.response);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              state.isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" replace state={{ from: location }} />
              )
            }
          />
          <Route
            path="/income"
            element={
              state.isAuthenticated ? (
                <Income />
              ) : (
                <Navigate to="/login" replace state={{ from: location }} />
              )
            }
          />
          <Route
            path="/expense"
            element={
              state.isAuthenticated ? (
                <Expense />
              ) : (
                <Navigate to="/login" replace state={{ from: location }} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
