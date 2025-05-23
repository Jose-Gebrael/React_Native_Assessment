import axios from 'axios';

export const createProductAPI = async ({
  accessToken,
  formData,
}: {
  accessToken: string;
  formData: FormData;
}) => {
  const res = await axios.post(
    'https://backend-practice.eurisko.me/api/products',
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};
