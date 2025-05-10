import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import productsData from '../assets/data/Products.json';
import {Product} from '../types/product.types';
import {AppStackNavigationProp} from '../types/navigation.types';
import Feather from 'react-native-vector-icons/Feather';
import styles from './ProductDetails.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {useTheme} from '../context/ThemeContext';

type ProductDetailsRouteProp = RouteProp<
  {params: {productId: string}},
  'params'
>;

export default function ProductDetails() {
  const {colors} = useTheme();
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<AppStackNavigationProp>();
  const {productId} = route.params;

  const product = productsData.data.find(
    item => item._id === productId,
  ) as Product;

  const generateRandomRating = (): number => {
    return parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));
  };
  const generateRandomReviews = (): number => {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Feather
                name="heart"
                size={24}
                color="#000"
                style={[styles.icon, {color: colors.textColor}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Feather
                name="send"
                size={24}
                color="#000"
                style={[styles.icon, {color: colors.textColor}]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={{uri: product.images[0].url}}
          style={styles.productImage}
        />

        <Title
          text={product.title}
          textAlign="left"
          style={{width: Dimensions.get('window').width * 0.5}}
        />
        <Title text={`$${product.price.toFixed(2)}`} textAlign="right" />

        <Text style={styles.rating}>
          ⭐ {generateRandomRating()} ({generateRandomReviews()} reviews)
        </Text>

        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Description
        </Text>
        <Text style={[styles.description, {color: colors.textColor}]}>
          {product.description}
        </Text>

        <View style={{marginBottom: 50}}>
          <Button title="Add to Cart" onPress={() => {}} variant="confirm" />
        </View>
      </ScrollView>
    </View>
  );
}
