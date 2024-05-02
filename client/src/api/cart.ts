import { API_URL } from "./constants";

const getCart = async () => {
  const response = await fetch(`${API_URL}/cart`, {
    credentials: "include",
  });
  return response.json();
};

const addToCart = async (productId: string) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

const removeFromCart = async (productId: string) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "DELETE",
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

export { getCart, addToCart, removeFromCart };
