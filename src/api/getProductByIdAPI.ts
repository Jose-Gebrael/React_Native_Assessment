import axios from 'axios';
import {Product} from '../types/product.types';

export const getProductByIdAPI = async (
  id: string,
  accessToken: string,
): Promise<Product> => {
  const res = await axios.get(
    `https://backend-practice.eurisko.me/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data.data;
};
