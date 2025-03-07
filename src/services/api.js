import axiosInstance from "../libs/axiosConfig";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
  logout: () => axiosInstance.post("/auth/logout"),
};

export const productsAPI = {
  getAll: () => api.get("/products"),
  create: (product) => api.post("/products", product),
  update: (id, product) => api.put(`/products/${id}`, product),
};

export const batchesAPI = {
  getAll: () => api.get("/batches"),
  create: (batch) => api.post("/batches", batch),
  update: (id, batch) => api.put(`/batches/${id}`, batch),
};

export const ordersAPI = {
  create: (order) => api.post("/orders", order),
  getAll: () => api.get("/orders"),
};

export default api;
