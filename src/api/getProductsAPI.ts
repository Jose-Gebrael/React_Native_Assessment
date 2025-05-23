import axiosInstance from './axiosInstance';

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

  const response = await axiosInstance.get('/products', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: query,
  });

  return response.data;
};
