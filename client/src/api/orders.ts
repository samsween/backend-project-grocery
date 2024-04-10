import { API_URL } from "./constants";


const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return response.json();
};

const deleteOrder = async (id: string) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export { getOrders, deleteOrder };
