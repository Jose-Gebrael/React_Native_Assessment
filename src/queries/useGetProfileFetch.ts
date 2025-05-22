import { useQuery } from '@tanstack/react-query';
import { getProfileAPI } from '../api/getProfileAPI';

export const useGetProfileFetch = (accessToken: string | null) => {
  return useQuery({
    queryKey: ['getProfile'],
    queryFn: () => getProfileAPI(accessToken!),
  });
};
