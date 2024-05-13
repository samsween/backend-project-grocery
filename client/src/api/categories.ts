import { API_URL } from "./constants";

const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
};

const deleteCategory = async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const getCategory = async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`);
  return response.json();
};

const addCategory = async (name: string) => {
  const res = await fetch(`${API_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export { getCategories, deleteCategory, getCategory, addCategory };
