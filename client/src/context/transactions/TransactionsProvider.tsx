import { useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect, useReducer } from "react";
import {
  TRANSACTIONS_INITIAL_STATE,
  transactionsReducer,
  TransactionsContext,
} from ".";
import { AuthContext } from "../auth";
import { Transaction } from "@/interface/Transaction";
import { ActionTypes } from "../../constants";
import instance from "@/pages/axiosInstance";
import { User } from "@/interface/User";

interface TransactionState {
  children: ReactNode;
}

export const TransactionsProvider: FC<TransactionState> = ({ children }) => {
  const [state, dispatch] = useReducer(
    transactionsReducer,
    TRANSACTIONS_INITIAL_STATE
  );

  const { user, updateUser } = useContext(AuthContext);
  const router = useRouter();

  const createTransaction = async (value: {
    amount: string;
    transactionType: string;
  }) => {
    try {
      setIsLoading(true);
      const { amount, transactionType } = value;
      const response = await instance.post("transactions/create", {
        amount,
        transactionType,
        userId: user?._id,
      });

      const data: { transactions: Transaction[]; user: User } = response.data;

      if ("error" in response.data) {
        dispatch({
          type: ActionTypes.CREATE_TRANSACTION_FAIL,
          payload: response.data.error,
        });
        setIsLoading(false);
        return;
      }
      dispatch({
        type: ActionTypes.CREATE_TRANSACTION_SUCCESS,
        payload: data.transactions,
      });
      updateUser(data.user);
      setIsLoading(false);
    } catch (error) {
      console.log("Error creating transaction");
      dispatch({
        type: ActionTypes.CREATE_TRANSACTION_FAIL,
        payload: "Error creating transaction",
      });
      setIsLoading(false);
    }
  };

  const getTransactions = async () => {
    try {
      setIsLoading(true);

      const response = await instance.get(`transactions/${user?._id}`);
      const data: Transaction[] = response.data;

      if ("error" in data) {
        dispatch({
          type: ActionTypes.GET_TRANSACTIONS_FAIL,
          payload: response.data.error,
        });
        setIsLoading(false);
        return;
      }
      dispatch({ type: ActionTypes.GET_TRANSACTIONS_SUCCESS, payload: data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAN_ERROR, payload: "" });
  };

  const setIsLoading = (isLoading: boolean) => {
    dispatch({ type: ActionTypes.IS_LOADING, payload: isLoading });
  };
  return (
    <TransactionsContext.Provider
      value={{
        ...state,
        createTransaction,
        getTransactions,
        clearError,
        setIsLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
