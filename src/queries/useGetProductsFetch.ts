import {useQuery} from '@tanstack/react-query';
import {getProductsAPI} from '../api/getProductsAPI';
import type {GetProductsParams} from '../types/product.types';

export const useGetProductsFetch = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsAPI(params),
    staleTime: 1000 * 60, // optional: cache for 1 min
    gcTime: 1000 * 60 * 5, // optional: garbage collect after 5 min
  });
};
