import {useMutation} from '@tanstack/react-query';
import {resendOTP, ResendOTPPayload} from '../api';

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: (data: ResendOTPPayload) => resendOTP(data),
  });
};
