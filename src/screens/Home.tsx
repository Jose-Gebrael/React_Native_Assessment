import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './Home.styles';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import productsData from '../assets/data/Products.json';
import {Product} from '../types/product.types';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';

export default function Home() {
  const navigation = useNavigation<AppStackNavigationProp>();
  const products: Product[] = productsData.data;

  const generateRandomRating = (): number => {
    return parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));
  };

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item._id})
      }>
      <Image source={{uri: item.images[0].url}} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.productDetails}>
        <Text style={styles.productRating}>⭐ {generateRandomRating()}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Title text="Discover" textAlign="left" />
      <Text style={styles.subtitle}>Find amazing products just for you</Text>
      <TextInput placeholder="Search..." isSearch={true} />

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
