import axios from 'axios';

export const getProfileAPI = async (accessToken: string) => {
  const response = await axios.get('https://backend-practice.eurisko.me/api/user/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
