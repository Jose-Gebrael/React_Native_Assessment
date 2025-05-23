import axiosInstance from './axiosInstance';

export const deleteProductAPI = async ({
  productId,
  accessToken,
}: {
  productId: string;
  accessToken: string;
}) => {
  const response = await axiosInstance.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
