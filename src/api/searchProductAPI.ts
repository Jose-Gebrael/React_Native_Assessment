import axios from 'axios';
import {Product} from '../types/product.types';

export const searchProductAPI = async (
  query: string,
  accessToken: string,
): Promise<Product[]> => {
  const res = await axios.get(
    'https://backend-practice.eurisko.me/api/products/search',
    {
      params: {query},
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data.data;
};
