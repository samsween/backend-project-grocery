const { default: axios } = require("axios");
const API_URL = process.env.API_URL || "http://localhost:3000";
const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/employees`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const createEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/api/employees`, employee);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/employees/${id}`,
      employee
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const employeeService = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
