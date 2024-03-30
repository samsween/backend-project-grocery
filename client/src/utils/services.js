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

const authService = {
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, user, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async logout() {
    try {
      const response = await axios.delete(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async getUser() {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw err.response.data.error;
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

const employeeService = {
  async getEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
  async getEmployee(id) {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  },
};

export { productService, authService, orderService, employeeService };
