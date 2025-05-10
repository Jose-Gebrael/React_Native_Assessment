// src/screens/Home.tsx
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './Home.styles';
import { TextInput } from '../components/atoms/TextInput';
import { Title } from '../components/atoms/Title';
import productsData from '../assets/data/Products.json';
import { Product } from '../types/product.types';
import ProductCard from '../components/molecules/ProductCard/ProductCard';

export default function Home() {
  const products: Product[] = productsData.data;

  // Render Product Card Component
  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <Title text="Discover" textAlign="left" />
      <Text style={styles.subtitle}>Find amazing products just for you</Text>
      <TextInput placeholder="Search..." isSearch={true} />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}
