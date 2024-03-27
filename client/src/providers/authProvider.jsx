
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { authService } from "../utils/services";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const {isLoading, data} = useQuery({ queryKey: ['user'], queryFn: authService.getUser });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ user: data }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext).user;