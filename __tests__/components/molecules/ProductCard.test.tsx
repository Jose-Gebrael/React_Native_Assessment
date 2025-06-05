import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ProductCard} from '../../../src/components/molecules/ProductCard';
import { Product } from '../../../src/types/product.types';

const navigateMock = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

import {useNavigation} from '@react-navigation/native';

jest.mock('../../../src/store/themeStore', () => ({
  useThemeStore: () => ({
    colors: {
      cardBackgroundColor: '#fff',
      borderColor: '#ccc',
      textColor: '#000',
      textLinkColor: '#1C83FF',
    },
  }),
}));

const mockProduct: Product = {
  _id: '123',
  title: 'Test Product',
  price: 25.5,
  description: 'A nice test product',
  images: [{ url: '/image.jpg' }],
  location: {
    name: 'Test Location',
    latitude: 33.8886,
    longitude: 35.4955,
  },
};

describe('ProductCard', () => {
  it('renders the product title and price', () => {
    const {getByText} = render(<ProductCard product={mockProduct} />);
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$25.50')).toBeTruthy();
  });

  it('renders the image if product has images', () => {
    const {getByTestId} = render(<ProductCard product={mockProduct} />);
    const image = getByTestId('product-image');
    expect(image.props.source.uri).toContain('/image.jpg');
  });

  it('renders "No Image" if product has no images', () => {
    const productWithoutImage = {...mockProduct, images: []};
    const {getByText} = render(<ProductCard product={productWithoutImage} />);
    expect(getByText('No Image')).toBeTruthy();
  });

  it('navigates to ProductDetails on press', () => {
    (useNavigation as jest.Mock).mockReturnValue({navigate: navigateMock});

    const {getByText} = render(<ProductCard product={mockProduct} />);
    fireEvent.press(getByText('Test Product'));

    expect(navigateMock).toHaveBeenCalledWith('ProductDetails', {
      productId: '123',
    });
  });
});
