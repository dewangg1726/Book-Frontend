import axios from 'axios';
const api = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  timeout:10_000
});
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;         
});

export default api;