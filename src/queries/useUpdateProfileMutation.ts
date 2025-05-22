import {useMutation} from '@tanstack/react-query';
import {updateProfileAPI, UpdateProfilePayload} from '../api';

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfileAPI(data),
  });
};
