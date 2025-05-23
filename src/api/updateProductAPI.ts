import axios from 'axios';

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
  const response = await axios.put(
    `https://backend-practice.eurisko.me/api/products/${productId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
