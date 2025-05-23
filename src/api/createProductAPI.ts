import axiosInstance from './axiosInstance';

export const createProductAPI = async ({
  accessToken,
  formData,
}: {
  accessToken: string;
  formData: FormData;
}) => {
  const res = await axiosInstance.post('/products', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
