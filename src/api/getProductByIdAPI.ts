import axiosInstance from './axiosInstance';
import {Product} from '../types/product.types';

export const getProductByIdAPI = async (
  id: string,
  accessToken: string,
): Promise<Product> => {
  const res = await axiosInstance.get(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data.data;
};
