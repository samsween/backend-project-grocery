import { API_URL } from "./constants";
import axios from "axios";
const signIn = async (user: { username: string; password: string }) => {
  console.log(user.username + " " + user.password);
  // const response = await fetch(`${API_URL}/auth/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify(user),
  // });
  const data = axios.post(`${API_URL}/auth/login`, user, {
    withCredentials: true,
  });
  return data;
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
