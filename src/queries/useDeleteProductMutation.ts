import {useMutation} from '@tanstack/react-query';
import {deleteProductAPI} from '../api';

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: deleteProductAPI,
  });
};
