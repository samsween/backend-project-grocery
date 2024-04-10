import { API_URL } from "./constants";

const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  return response.json();
};

export { getEmployees };
