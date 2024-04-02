const API_URL = "http://localhost:3000/api";

const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  return response.json();
};

export { getEmployees };
