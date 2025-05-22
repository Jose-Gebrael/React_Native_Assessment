import {useQuery} from '@tanstack/react-query';
import {searchProductAPI} from '../api';

export const useSearchProductFetch = (query: string, accessToken: string) => {
  return useQuery({
    queryKey: ['searchProducts', query],
    queryFn: () => searchProductAPI(query, accessToken),
    enabled: !!query, // prevent auto-triggering when empty
  });
};
