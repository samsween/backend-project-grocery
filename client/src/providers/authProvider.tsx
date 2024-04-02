import { getAuth, logOut, signIn } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
};

export type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthContexthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      const user = await getAuth();
      if (user?.id) {
        setUser(user);
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
