import axios from 'axios';
import {useAuthStore} from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me/api',
});

// Add interceptor for 401 responses
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await useAuthStore.getState().getRefreshToken();

        const res = await axios.post(
          'https://backend-practice.eurisko.me/api/auth/refresh-token',
          {
            refreshToken,
            token_expires_in: '60m',
          },
        );

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        // Save new tokens
        await useAuthStore
          .getState()
          .login(
            newAccessToken,
            newRefreshToken,
          );

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
