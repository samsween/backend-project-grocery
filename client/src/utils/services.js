import axios from "axios";

const API_URL = "http://localhost:3000/api";

const productService = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async getProduct(id) {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async createProduct(product) {
    try {
      const response = await axios.post(`${API_URL}/products`, product, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async updateProduct(id, product) {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, product, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
};

const userService = {
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, user);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, user);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async logout() {
    try {
      const response = await axios.post(`${API_URL}/users/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async getUser() {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
};

const orderService = {
  async getOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async createOrder(order) {
    try {
      const response = await axios.post(`${API_URL}/orders`, order, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async updateOrder(id, order) {
    try {
      const response = await axios.put(`${API_URL}/orders/${id}`, order, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async deleteOrder(id) {
    try {
      const response = await axios.delete(`${API_URL}/orders/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
};

export { productService, userService, orderService };
