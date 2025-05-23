import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './ProductDetails.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useGetProductByIdFetch, useGetProfileFetch} from '../queries';
import {AppStackNavigationProp} from '../types/navigation.types';
import {Separator} from '../components/atoms/Separator';
import Swiper from 'react-native-swiper';
import MapView, {Marker} from 'react-native-maps';
import {useDeleteProductMutation} from '../queries';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

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
  const {mutate: deleteProduct, isPending: isDeleting} =
    useDeleteProductMutation();

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
    refetch,
    isRefetching,
  } = useGetProductByIdFetch(productId, accessToken);

  const {data: profileData, isLoading: isProfileLoading} =
    useGetProfileFetch(accessToken);

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
      <ScrollView
        style={styles.detailsContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.textLinkColor}
            colors={[colors.textLinkColor]}
          />
        }>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BottomTabs', {screen: 'Home'})}>
            <Feather
              name="arrow-left"
              size={24}
              style={[styles.icon, {color: colors.textColor}]}
            />
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
        <Title text="Product Details" textAlign="left" />
        <Swiper
          style={styles.imageSwiper}
          showsPagination
          autoplay
          dotColor="#ccc"
          activeDotColor={colors.textLinkColor}>
          {product.images.map((img, index) => (
            <Image
              key={index}
              source={{uri: `${IMAGE_BASE_URL}${img.url}`}}
              style={styles.productImage}
              resizeMode="cover"
            />
          ))}
        </Swiper>

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
        <TouchableOpacity
          onPress={() =>
            product.user?.email &&
            Linking.openURL(`mailto:${product.user.email}`)
          }>
          <Text style={[styles.description, {color: colors.textLinkColor}]}>
            {product.user?.email || 'N/A'}
          </Text>
        </TouchableOpacity>

        <Separator marginVertical={5} />
        <Separator marginVertical={5} />
        <Text style={[styles.subtitle, {color: colors.textColor}]}>
          Location
        </Text>
        {product.location && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: product.location.latitude,
                longitude: product.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              <Marker
                coordinate={{
                  latitude: product.location.latitude,
                  longitude: product.location.longitude,
                }}
                title={product.location.name}
                description={`Lat: ${product.location.latitude}, Lon: ${product.location.longitude}`}
              />
            </MapView>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${product.location.latitude},${product.location.longitude}`,
                )
              }>
              <Text style={{color: colors.textLinkColor}}>
                Open in Google Maps
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.addToCartButton}>
          <Button title="Add to Cart" onPress={() => {}} variant="confirm" />
        </View>

        {!isProfileLoading &&
          profileData?.data?.user?.email === product.user?.email && (
            <View style={styles.ownerActions}>
              <Button
                title="Edit"
                variant="confirm"
                style={styles.buttons}
                onPress={() =>
                  navigation.navigate('ProductEdit', {productId: product._id})
                }
              />
              <Button
                title={isDeleting ? 'Deleting...' : 'Delete'}
                variant="logout"
                style={styles.buttons}
                onPress={() => {
                  Alert.alert(
                    'Confirm Deletion',
                    'Are you sure you want to delete this product?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          deleteProduct(
                            {productId: product._id, accessToken},
                            {
                              onSuccess: () => {
                                Toast.show({
                                  type: 'success',
                                  text1:
                                    'Product deleted successfully! Please refresh.',
                                });
                                navigation.reset({
                                  index: 0,
                                  routes: [
                                    {
                                      name: 'BottomTabs',
                                      params: {screen: 'Home'},
                                    },
                                  ],
                                });
                              },
                              onError: () => {
                                Toast.show({
                                  type: 'error',
                                  text1: 'Deletion failed',
                                  text2: 'Could not delete the product.',
                                });
                              },
                            },
                          );
                        },
                      },
                    ],
                  );
                }}
              />
            </View>
          )}
      </ScrollView>
    </View>
  );
}
