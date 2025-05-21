import {useMutation} from '@tanstack/react-query';
import {createUserAPI, CreateUserPayload} from '../api';

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUserAPI(data),
  });
};
