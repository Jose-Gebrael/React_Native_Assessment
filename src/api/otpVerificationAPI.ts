import axios from 'axios';

export interface OTPPayload {
  email: string;
  otp: string;
}

export const otpVerification = async ({email, otp}: OTPPayload) => {
  const response = await axios.post('https://backend-practice.eurisko.me/api/auth/verify-otp', {
    email,
    otp,
  });

  return response.data;
};
