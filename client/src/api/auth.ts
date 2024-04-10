import { API_URL } from "./constants";

const signIn = async (user: { username: string; password: string }) => {
  console.log(user.username + " " + user.password);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  return response.json();
};

const getAuth = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

const logOut = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export { signIn, getAuth, logOut };
