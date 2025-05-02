import axios from 'axios';

const url = import.meta.env.VITE_APP_BASE_URL;
console.log("url",url);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
