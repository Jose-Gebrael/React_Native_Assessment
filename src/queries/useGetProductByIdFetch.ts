import {useQuery} from '@tanstack/react-query';
import {getProductByIdAPI} from '../api';

export const useGetProductByIdFetch = (id: string, accessToken: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByIdAPI(id, accessToken),
    enabled: !!id,
  });
