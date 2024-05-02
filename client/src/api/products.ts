import { API_URL } from "./constants";

const getProducts = async (category: string | null = null) => {
  if (category) {
    const response = await fetch(`${API_URL}/products?category=${category}`);
    return response.json();
  }
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};
const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const getProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

const addProduct = async (product: any) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: product,
  });
  return res.json();
};
const editProduct = async (product: { id: string; product: FormData }) => {
  const response = await fetch(`${API_URL}/products/${product.id}`, {
    method: "PUT",
    body: product.product,
  });
  return response.json();
};

export { getProducts, deleteProduct, getProduct, addProduct, editProduct };
