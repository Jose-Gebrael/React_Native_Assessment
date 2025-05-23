import axiosInstance from './axiosInstance';
import {Product} from '../types/product.types';

export const searchProductAPI = async (
  query: string,
  accessToken: string,
): Promise<Product[]> => {
  const res = await axiosInstance.get('/products/search', {
    params: {query},
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data.data;
};
