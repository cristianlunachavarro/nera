import { useContext } from "react";
import { AuthContext } from "@/context/auth";

const useAuthentication = () => {
  const { user } = useContext(AuthContext);

  return {
    isAuthenticated: user?._id ? user._id?.length > 0 : false,
  };
};

export default useAuthentication;
