// src/Instances/AxiosInstance.ts
import axios from 'axios';

const AUTH_BASE = 'http://localhost:3001'; // your existing base
const instance = axios.create({
  baseURL: AUTH_BASE,
  timeout: 5000, // a bit larger than 1000ms to avoid accidental timeouts
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // allows cookies to be sent (useful if you later use httpOnly refresh cookies)
});

/* --- Token attach (request interceptor) --- */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        // fallback for cases where headers is not set
        config.headers = { Authorization: `Bearer ${token}` } as any;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* --- Refresh-on-401 (response interceptor) --- */
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v?: any) => void; reject: (e: any) => void; config: any }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else {
      p.config.headers['Authorization'] = `Bearer ${token}`;
      p.resolve(instance(p.config));
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error?.config;
    if (!originalConfig) return Promise.reject(error);

    // only attempt refresh on 401 and when we haven't retried this request yet
    if (error.response?.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        // queue this request until the refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        // call refresh endpoint directly (use axios to avoid interceptor recursion)
        const refreshRes = await axios.post(`${AUTH_BASE}/refresh`, {}, { withCredentials: true });
        const newAccessToken = refreshRes.data?.accessToken;
        if (!newAccessToken) {
          throw new Error('Refresh did not return accessToken');
        }

        // save new token and update default header
        localStorage.setItem('accessToken', newAccessToken);
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // retry queued requests
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // retry the original request with the new token
        originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalConfig);
      } catch (refreshErr) {
        // refresh failed -> clear tokens and reject queued requests
        processQueue(refreshErr, null);
        isRefreshing = false;
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
