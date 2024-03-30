const API_URL = "http://localhost:3000/api";

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
