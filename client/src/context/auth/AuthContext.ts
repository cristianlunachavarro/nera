import { createContext } from "react";
import { User } from "@/interface/User";

interface ContextProps {
  user?: User;
  error?: string;
  login: (value: { username: string; password: string }) => void;
  logout: () => void;
  cleanError: () => void;
  register: (value: {
    username: string;
    name: string;
    lastname: string;
    password: string;
    balance: number;
  }) => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext({} as ContextProps);
