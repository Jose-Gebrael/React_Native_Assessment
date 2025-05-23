import axiosInstance from './axiosInstance';

export interface ResendOTPPayload {
  email: string;
}

export const resendOTP = async ({email}: ResendOTPPayload) => {
  const response = await axiosInstance.post('/auth/resend-verification-otp', {
    email,
  });

  return response.data;
};
