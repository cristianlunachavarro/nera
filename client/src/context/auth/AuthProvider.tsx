import { useReducer, ReactNode, FC, useEffect } from "react";
import { useRouter } from "next/router";

import {
  AUTH_INITIAL_STATE,
  AuthContext,
  authReducer,
} from ".";

import { User, Error } from "@/interface/User";

import useAuthentication from "@/hooks/useIsAuth";

import { ActionTypes } from "../../constants";

import instance from "@/pages/axiosInstance";

interface AuthState {
  children: ReactNode;
}

export const AuthProvider: FC<AuthState> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const router = useRouter();
  const { isAuthenticated } = useAuthentication();

  const login = async (value: { username: string; password: string }) => {
    try {
      const { data }: { data: Error | User } = await instance.post(
        "user/login",
        {
          username: value.username,
          password: value.password,
        }
      );
      if ("error" in data) {
        dispatch({ type: ActionTypes.LOGIN_FAIL, payload: data.error });
        return;
      }

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
      router.push("transaction");
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
        payload: "Invalid username or password",
      });
    }
  };

  const logout = async () => {
    const { data }: { data: User | string } = await instance.post(
      "user/logout"
    );
    if (data === "OK") {
      dispatch({ type: ActionTypes.LOGOUT_SUCCESS, payload: {} });
      router.push("login");
    } else {
      dispatch({ type: ActionTypes.LOGOUT_FAIL, payload: "Error in logout" });
    }
  };

  const register = async (value: {
    username: string;
    name: string;
    lastname: string;
    password: string;
    balance: number;
  }) => {
    try {
      const { data }: { data: User | Error } = await instance.post(
        "user/register",
        value
      );

      if ("error" in data) {
        dispatch({ type: ActionTypes.CREATE_USER_FAIL, payload: data.error });
        return;
      }

      dispatch({ type: ActionTypes.CREATE_USER_SUCCESS, payload: data });
      router.push("transaction");
    } catch (error) {
      dispatch({
        type: ActionTypes.CREATE_USER_FAIL,
        payload: "Error creating user",
      });
    }
  };

  const cleanError = () => {
    dispatch({ type: ActionTypes.CLEAN_ERROR, payload: "" });
  };

  const updateUser = (user: User) => {
    dispatch({ type: ActionTypes.UPDATE_USER, payload: user });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("login");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, updateUser, cleanError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
