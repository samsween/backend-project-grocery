import axios from "axios";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../utils/services";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useQuery("me", async () => {
    try {
      const data = await userService.getUser();
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  });
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
