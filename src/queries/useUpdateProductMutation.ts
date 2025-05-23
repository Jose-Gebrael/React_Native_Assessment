import {useMutation} from '@tanstack/react-query';
import {updateProductAPI} from '../api/updateProductAPI';

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: updateProductAPI,
  });
};
