import axios from 'axios';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  accessToken: string;
}

export const getProductsAPI = async (params: GetProductsParams) => {
  const {accessToken, ...query} = params;

  const response = await axios.get(
    'https://backend-practice.eurisko.me/api/products',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: query,
    },
  );

  return response.data;
};
