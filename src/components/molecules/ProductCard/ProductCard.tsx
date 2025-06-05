import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './ProductCard.styles';
import {Product} from '../../../types/product.types';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../../../types/navigation.types';
import {useThemeStore} from '../../../store/themeStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  const navigation = useNavigation<AppStackNavigationProp>();
  const {colors} = useThemeStore();

  return (
    <TouchableOpacity
      style={[
        styles.productCard,
        {backgroundColor: colors.cardBackgroundColor},
        {borderColor: colors.borderColor},
      ]}
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: product._id})
      }>
      {product.images?.length > 0 ? (
        <Image
          testID="product-image" // ✅ ADD THIS
          accessibilityRole="image"
          source={{
            uri: `https://backend-practice.eurisko.me${product.images[0].url}`,
          }}
          style={styles.productImage}
        />
      ) : (
        <View>
          <Text style={{color: colors.textColor}}>No Image</Text>
        </View>
      )}

      <Text
        style={[styles.productTitle, {color: colors.textColor}]}
        numberOfLines={1}>
        {product.title}
      </Text>
      <View style={styles.productDetails}>
        <Text style={[styles.productPrice, {color: colors.textLinkColor}]}>
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
