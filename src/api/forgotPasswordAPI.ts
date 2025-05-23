import axiosInstance from './axiosInstance';

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = async ({email}: ForgotPasswordPayload) => {
  const response = await axiosInstance.post('/auth/forgot-password', {
    email,
  });

  return response.data;
};
