import axiosInstance from './axiosInstance';

export interface OTPPayload {
  email: string;
  otp: string;
}

export const otpVerification = async ({email, otp}: OTPPayload) => {
  const response = await axiosInstance.post('/auth/verify-otp', {
    email,
    otp,
  });

  return response.data;
};
