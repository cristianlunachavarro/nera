import { User } from "../../interface/User";
import { ActionTypes } from "../../constants";

interface UserState {
  user: User | undefined;
  error: string;
}

export type UserActionTypes =
  | { type: ActionTypes.CREATE_USER_SUCCESS; payload: User }
  | { type: ActionTypes.CREATE_USER_FAIL; payload: string }
  | { type: ActionTypes.LOGIN_SUCCESS; payload: User }
  | { type: ActionTypes.LOGIN_FAIL; payload: string }
  | { type: ActionTypes.LOGOUT_SUCCESS; payload: undefined }
  | { type: ActionTypes.LOGOUT_FAIL; payload: string }
  | { type: ActionTypes.UPDATE_USER; payload: User }
  | { type: ActionTypes.CLEAN_ERROR; payload: string };

export const AUTH_INITIAL_STATE: UserState = {
  user: {
    _id: "",
    name: "",
    lastname: "",
    username: "",
    accountId: "",
    balance: 0,
  },
  error: "",
};

export const authReducer = (
  state: UserState = AUTH_INITIAL_STATE,
  action: UserActionTypes
) => {
  switch (action.type) {
    case ActionTypes.CREATE_USER_SUCCESS:
      return { ...state, user: action.payload };
    case ActionTypes.CREATE_USER_FAIL:
      return { ...state, error: action.payload };

    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload };

    case ActionTypes.LOGIN_FAIL:
      return { ...state, error: action.payload };

    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, user: action.payload };

    case ActionTypes.LOGOUT_FAIL:
      return { ...state, error: action.payload };
    case ActionTypes.UPDATE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.CLEAN_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
