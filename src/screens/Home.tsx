import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './Home.styles';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import productsData from '../assets/data/Products.json';
import {Product} from '../types/product.types';
import ProductCard from '../components/molecules/ProductCard/ProductCard';
import {useTheme} from '../context/ThemeContext';

export default function Home() {
  const products: Product[] = productsData.data;
  const {colors} = useTheme();

  const renderProduct = ({item}: {item: Product}) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Discover" textAlign="left" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        Find amazing products just for you
      </Text>
      <TextInput placeholder="Search... (no backend yet)" isSearch={true} />

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingVertical: 10}}
      />
    </View>
  );
}
