import axios from 'axios';

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = async ({email}: ForgotPasswordPayload) => {
  const response = await axios.post('https://backend-practice.eurisko.me/api/auth/forgot-password', {
    email,
  });

  return response.data;
};
