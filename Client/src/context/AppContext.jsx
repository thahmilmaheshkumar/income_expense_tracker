import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "sonner";

const AppContext = createContext();

const initialIncomes = [];

const initialExpenses = [];

const initialState = {
  incomes: initialIncomes,
  expenses: initialExpenses,
  isAuthenticated: false,
  user: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_INCOME":
      toast.success("Income added successfully");
      return {
        ...state,
        incomes: [...state.incomes, { id: Date.now(), ...action.payload }],
      };
    case "ADD_EXPENSE":
      toast.success("Expense added successfully");
      return {
        ...state,
        expenses: [...state.expenses, { id: Date.now(), ...action.payload }],
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch, initialState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
