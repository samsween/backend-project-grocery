const API_URL = "http://localhost:3000/api";

const signIn = async (username: string, password: string) => {
  console.log(username + " " + password);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
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
