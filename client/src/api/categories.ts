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

const addCategory = async (category: any) => {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    body: category,
  });
  return res.json();
};

export { getCategories, deleteCategory, getCategory, addCategory };
