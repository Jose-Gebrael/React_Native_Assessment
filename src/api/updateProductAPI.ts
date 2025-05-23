import axiosInstance from './axiosInstance';

interface UpdateProductParams {
  productId: string;
  accessToken: string;
  formData: FormData;
}

export const updateProductAPI = async ({
  productId,
  accessToken,
  formData,
}: UpdateProductParams) => {
  const response = await axiosInstance.put(`/products/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
