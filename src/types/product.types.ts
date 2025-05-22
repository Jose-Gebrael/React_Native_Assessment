export type Product = {
  _id: string;
  title: string;
  price: number;
  images: {url: string}[];
  description: string;
  user?: {
    _id: string;
    email: string;
  };
  location?: {
    name: string;
    longitude: number;
    latitude: number;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type GetProductsParams = {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  accessToken: string;
};
