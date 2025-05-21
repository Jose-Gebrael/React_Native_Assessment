import {useMutation} from '@tanstack/react-query';
import {otpVerification, OTPPayload} from '../api';

export const useOTPMutation = () => {
  return useMutation({
    mutationFn: (data: OTPPayload) => otpVerification(data),
  });
};
