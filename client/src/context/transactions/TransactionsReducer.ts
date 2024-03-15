import { Transaction } from "@/interface/Transaction";
import { ActionTypes } from "../../constants";

interface TransactionsState {
  transactions: Transaction[] | [];
  error: string;
  isLoading: boolean;
}

export type TransactionsrActionTypes =
  | { type: ActionTypes.CREATE_TRANSACTION_FAIL; payload: string }
  | { type: ActionTypes.CREATE_TRANSACTION_SUCCESS; payload: Transaction[] }
  | { type: ActionTypes.GET_TRANSACTIONS_SUCCESS; payload: Transaction[] }
  | { type: ActionTypes.GET_TRANSACTIONS_FAIL; payload: string }
  | { type: ActionTypes.CLEAN_ERROR; payload: string }
  | { type: ActionTypes.IS_LOADING; payload: boolean }

export const TRANSACTIONS_INITIAL_STATE: TransactionsState = {
  transactions: [],
  error: "",
  isLoading: false,
};

export const transactionsReducer = (
  state: TransactionsState = TRANSACTIONS_INITIAL_STATE,
  action: TransactionsrActionTypes
) => {
  switch (action.type) {
    case ActionTypes.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ActionTypes.CREATE_TRANSACTION_FAIL:
      return { ...state, error: action.payload };
    case ActionTypes.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ActionTypes.CLEAN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
