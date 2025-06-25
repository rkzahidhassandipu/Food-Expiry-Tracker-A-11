import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
   return { user, loading };
};

export default useAuth;
