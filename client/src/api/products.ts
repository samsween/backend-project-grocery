const API_URL = "http://localhost:3000/api";

const getProducts = async () => {
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
  await fetch(`${API_URL}/products`, {
    method: "POST",
    body: product,
  });
};

export { getProducts, deleteProduct, getProduct, addProduct };
