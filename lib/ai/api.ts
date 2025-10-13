import axios from 'axios';
import { setupInterceptors } from './interceptors';

// Create axios instance
const api = axios.create({
  baseURL: '/', // can be updated to a proxy or API base
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(api);

// Optional: add default Authorization if needed
// api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
