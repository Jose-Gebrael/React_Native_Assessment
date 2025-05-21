import axios from 'axios';

export interface ResendOTPPayload {
  email: string;
}

export const resendOTP = async ({email}: ResendOTPPayload) => {
  const response = await axios.post('https://backend-practice.eurisko.me/api/auth/resend-verification-otp', {
    email,
  });

  return response.data;
};
