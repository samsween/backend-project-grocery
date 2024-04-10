import { API_URL } from "./constants";


const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

const deleteUser = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export { getUsers, deleteUser };
