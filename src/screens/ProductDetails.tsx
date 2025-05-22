import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './ProductDetails.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useGetProductByIdFetch} from '../queries/useGetProductByIdFetch';
import {AppStackNavigationProp} from '../types/navigation.types';
import {Separator} from '../components/atoms/Separator';

type ProductDetailsRouteProp = RouteProp<
  {params: {productId: string}},
  'params'
>;

const IMAGE_BASE_URL = 'https://backend-practice.eurisko.me';

export default function ProductDetails() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = useState('');
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<AppStackNavigationProp>();
  const {productId} = route.params;

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessToken(token);
      }
    })();
  }, [getAccessToken]);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdFetch(productId, accessToken);

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
        <ActivityIndicator
          size="large"
          color={colors.textLinkColor}
          style={styles.loadingText}
        />
        <Text style={[styles.loadingText, {color: colors.textColor}]}>
          Fetching Product...
        </Text>
      </View>
    );
  }

  if (error || !product) {
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
                style={[styles.icon, {color: colors.textColor}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Feather
                name="send"
                size={24}
                style={[styles.icon, {color: colors.textColor}]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={{uri: `${IMAGE_BASE_URL}${product.images[0]?.url}`}}
          style={styles.productImage}
        />

        <Title
          text={product.title}
          textAlign="left"
          style={{width: Dimensions.get('window').width * 0.5}}
        />
        <Title text={`$${product.price.toFixed(2)}`} textAlign="right" />

        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Description
        </Text>
        <Text style={[styles.description, {color: colors.textColor}]}>
          {product.description}
        </Text>
        <Separator marginVertical={5} />
        <Separator marginVertical={5} />
        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Seller Email
        </Text>
        <Text style={[styles.description, {color: colors.textColor}]}>
          {product.user?.email || 'N/A'}
        </Text>
        <Separator marginVertical={5} />
        <Separator marginVertical={5} />
        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Location
        </Text>
        <Text style={[styles.description, {color: colors.textColor}]}>
          {product.location?.name || 'N/A'} — Lat: {product.location?.latitude},
          Lon: {product.location?.longitude}
        </Text>

        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Created
        </Text>
        <Text style={{color: colors.textColor}}>
          {product.createdAt
            ? new Date(product.createdAt).toLocaleString()
            : 'Date not available'}
        </Text>

        <View style={styles.addToCartButton}>
          <Button title="Add to Cart" onPress={() => {}} variant="confirm" />
        </View>
      </ScrollView>
    </View>
  );
}
