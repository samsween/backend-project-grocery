const { default: axios } = require("axios");
const API_URL = process.env.API_URL || "http://localhost:3000";
const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/orders`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const getOrder = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const createOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, order);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const updateOrder = async (id, order) => {
  try {
    const response = await axios.put(`${API_URL}/api/orders/${id}`, order);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const orderService = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
