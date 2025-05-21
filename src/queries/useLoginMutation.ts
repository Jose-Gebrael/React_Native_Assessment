import {useMutation} from '@tanstack/react-query';
import {loginAPI, LoginPayload} from '../api';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginAPI(data),
  });
};
