import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-backend-prisma-sv62.onrender.com',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            'https://blog-backend-prisma-sv62.onrender.com/auth/refresh-token',
            {},
            { withCredentials: true },
          );

          const newAccessToken = res.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (err) {
          console.error('Refresh token error', err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
