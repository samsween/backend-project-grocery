import { getAuth, logOut } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
const isLoggedIn = async () => {
  const user = await getAuth();
  return user.id ? true : false;
};
const useAuth = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryFn: getAuth,
    queryKey: ["auth"],
  });

  const logout = async () => {
    await logOut();
    navigate({ to: "/login" });
  };

  return { user, isLoading, logout };
};

export { isLoggedIn };
export default useAuth;
