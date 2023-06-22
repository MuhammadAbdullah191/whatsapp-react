import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorageHelper';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: { 'Content-Type': 'multipart/form-data' }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getLocalStorage('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
