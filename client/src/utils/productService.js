const { default: axios } = require("axios");
const API_URL = process.env.API_URL || "http://localhost:3000";
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, product);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/api/products/${id}`, product);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
