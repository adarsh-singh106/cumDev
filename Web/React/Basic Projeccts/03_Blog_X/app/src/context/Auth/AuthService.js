import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

// Create an axios instance for cleaner config
const api = axios.create({
  baseURL: API_URL,
});

export const authService = {
  login: async (credentials) => {
    const { data } = await api.post("/login", credentials);
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  },

  register: async (userData) => {
    // Returns promise directly
    const { data } = await api.post("/register", userData);
    return data;
  },

  verifyEmail: async (token) => {
    const { data } = await api.post("/verify", { token });
    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },
};