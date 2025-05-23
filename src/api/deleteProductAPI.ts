import axios from 'axios';

export const deleteProductAPI = async ({
  productId,
  accessToken,
}: {
  productId: string;
  accessToken: string;
}) => {
  const response = await axios.delete(
    `https://backend-practice.eurisko.me/api/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
