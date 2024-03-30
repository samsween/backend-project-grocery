import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authService } from "../utils/services";
import { Loading } from "../pages/loading";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getUser,
    retry: 0,
  });
  useEffect(() => {
    setUser(data);
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
