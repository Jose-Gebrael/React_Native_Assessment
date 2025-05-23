import axiosInstance from './axiosInstance';

export const getProfileAPI = async (accessToken: string) => {
  const response = await axiosInstance.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
