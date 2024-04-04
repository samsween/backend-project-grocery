import { getAuth, logOut, signIn } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    enabled: !isLoggedIn(),
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate({ to: "/admin" });
    },
  });
  const logout = async () => {
    await logOut();
    navigate({ to: "/login" });
  };

  return { user, isLoading, login, logout };
};

export { isLoggedIn };
export default useAuth;
