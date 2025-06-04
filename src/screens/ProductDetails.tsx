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
  Modal,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './ProductDetails.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useItemStore} from '../store/itemStore';
import {
  useGetProductByIdFetch,
  useGetProfileFetch,
  useDeleteProductMutation,
} from '../queries';
import {AppStackNavigationProp} from '../types/navigation.types';
import {Separator} from '../components/atoms/Separator';
import Swiper from 'react-native-swiper';
import MapView, {Marker} from 'react-native-maps';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const {mutate: deleteProduct, isPending: isDeleting} =
    useDeleteProductMutation();
  const {addToCart, getQuantity} = useItemStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessToken(token);
      }
    };
    fetchToken();
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

  const quantityInCart = getQuantity(product._id);

  return (
    <>
      {/* Fullscreen Modal Swiper */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalPage}>
          <TouchableOpacity
            style={styles.imgOverlay}
            onPress={() => setModalVisible(false)}>
            <Feather name="x" size={28} color="white" />
          </TouchableOpacity>

          <Swiper
            index={activeIndex}
            loop={false}
            showsPagination
            dotColor="#ccc"
            activeDotColor="#fff"
            style={{height: Dimensions.get('window').height * 0.8}}>
            {product.images.map((img, index) => (
              <View key={index} style={styles.imgViewUp}>
                <View key={index} style={styles.imgViewLow}>
                  {imageLoading && (
                    <ActivityIndicator
                      size="large"
                      color="#ffffff"
                      style={styles.imageLoading}
                    />
                  )}
                  <Image
                    source={{uri: `${IMAGE_BASE_URL}${img.url}`}}
                    resizeMode="contain"
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                  />
                </View>
              </View>
            ))}
          </Swiper>
        </View>
      </Modal>

      {/* Main Page */}
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
              onPress={() =>
                navigation.navigate('BottomTabs', {screen: 'Home'})
              }>
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
            loop={false}
            dotColor="#ccc"
            activeDotColor={colors.textLinkColor}>
            {product.images?.length > 0 ? (
              product.images.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {
                    setActiveIndex(index);
                    setModalVisible(true);
                  }}>
                  <Image
                    source={{uri: `${IMAGE_BASE_URL}${img.url}`}}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Image
                source={require('../assets/images/no-image.png')}
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
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
            onPress={async () => {
              const email = product.user?.email;
              if (!email) {
                return;
              }
              const url = `mailto:${email}`;
              try {
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Cannot open mail app',
                    text2: 'No email app found on your device.',
                  });
                }
              } catch (Emailerror) {
                Toast.show({
                  type: 'error',
                  text1: 'Something went wrong',
                  text2: 'Failed to open your email app.',
                });
              }
            }}>
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

          {quantityInCart > 0 && (
            <Text style={[styles.quantityInCart, {color: colors.textColor}]}>
              In cart: {quantityInCart}
            </Text>
          )}
          <View style={styles.addToCartButton}>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(product._id, product.title, product.description)}
              variant="confirm"
            />
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
    </>
  );
}
