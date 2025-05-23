import axiosInstance from './axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
  token_expires_in: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginAPI = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', payload);
  return response.data.data;
};
