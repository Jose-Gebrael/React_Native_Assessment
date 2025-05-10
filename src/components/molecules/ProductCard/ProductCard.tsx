// src/components/atoms/ProductCard/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ProductCard.styles';
import { Product } from '../../../types/product.types';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../../../types/navigation.types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigation = useNavigation<AppStackNavigationProp>();

  // Generate Random Rating for Display
  const generateRandomRating = (): number => {
    return parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));
  };

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: product._id })}
    >
      <Image source={{ uri: product.images[0].url }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={1}>
        {product.title}
      </Text>
      <View style={styles.productDetails}>
        <Text style={styles.productRating}>⭐ {generateRandomRating()}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}
