import axios from 'axios';
import {useAuthStore} from '../store/authStore';
import {API_URL, API_REFRESH} from '@env';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add interceptor for 401 responses
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error?.message === 'Invalid token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await useAuthStore.getState().getRefreshToken();

        const res = await axios.post(
          API_REFRESH,
          {
            refreshToken,
            token_expires_in: '1y',
          },
        );

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        // Save new tokens
        await useAuthStore.getState().login(newAccessToken, newRefreshToken);

        // Set Authorization for future requests
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

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
