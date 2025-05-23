import {useMutation} from '@tanstack/react-query';
import {createProductAPI} from '../api';

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: createProductAPI,
  });
};
