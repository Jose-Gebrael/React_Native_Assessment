import {useMutation} from '@tanstack/react-query';
import {forgotPassword, ForgotPasswordPayload} from '../api';

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) => forgotPassword(data),
  });
};
