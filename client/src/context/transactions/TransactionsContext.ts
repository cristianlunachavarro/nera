import { Transaction } from "@/interface/Transaction";
import { createContext } from "react";

interface ContextProps {
  transactions: Transaction[];
  error?: string;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
  createTransaction: (value: {
    amount: string;
    transactionType: string;
  }) => void;
  getTransactions: () => void;
  clearError: () => void;
}

export const TransactionsContext = createContext({} as ContextProps);
