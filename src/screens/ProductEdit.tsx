import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Title} from '../components/atoms/Title';
import {TextInput} from '../components/atoms/TextInput';
import {Button} from '../components/atoms/Button';
import styles from './ProductEdit.styles';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {AppStackNavigationProp} from '../types/navigation.types';
import {useNavigation} from '@react-navigation/native';
import {
  CreateProductSchema,
  CreateProductType,
} from '../schemas/createProductSchema';
import {useGetProductByIdFetch, useUpdateProductMutation} from '../queries';

type ProductEditRouteProp = RouteProp<{params: {productId: string}}, 'params'>;

export default function ProductEdit() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const route = useRoute<ProductEditRouteProp>();
  const navigation = useNavigation<AppStackNavigationProp>();
  const {productId} = route.params;
  const {mutate: updateProduct} = useUpdateProductMutation();

  const [accessToken, setAccessToken] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [location, setLocation] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const {data: product, isLoading} = useGetProductByIdFetch(
    productId,
    accessToken,
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<CreateProductType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
    },
  });

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessToken(token);
      }
    })();
  }, [getAccessToken]);

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price.toString());
      setImages(
        product.images.map(img => ({
          uri: `https://backend-practice.eurisko.me${img.url}`,
          name: 'existing-image.jpg',
          type: 'image/jpeg',
        })),
      );
      setLocation(product.location);
    }
  }, [product, setValue]);

  const pickImages = () => {
    Alert.alert('Upload Image', 'Choose a method', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({mediaType: 'photo'}, response => {
            if (response.assets?.length) {
              const newAssets = response.assets;
              const total = images.length + newAssets.length;
              if (total <= 5) {
                setImages(prev => [...prev, ...newAssets]);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Limit Exceeded',
                  text2: 'You can only upload up to 5 images.',
                });
              }
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(
            {mediaType: 'photo', selectionLimit: 5 - images.length},
            response => {
              if (response.assets?.length) {
                const newAssets = response.assets;
                const total = images.length + newAssets.length;
                if (total <= 5) {
                  setImages(prev => [...prev, ...newAssets]);
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Limit Exceeded',
                    text2: 'You can only upload up to 5 images.',
                  });
                }
              }
            },
          );
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const onMapPress = (e: MapPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setLocation({
      name: 'Custom Location',
      latitude,
      longitude,
    });
  };

  const onSubmit = (values: CreateProductType) => {
    if (!location) {
      Toast.show({
        type: 'error',
        text1: 'Location is required',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('location', JSON.stringify(location));

    images.forEach((img, index) => {
      formData.append('images', {
        uri: img.uri,
        name: `image-${index}.jpg`,
        type: img.type || 'image/jpeg',
      } as any);
    });

    updateProduct(
      {
        productId,
        accessToken,
        formData,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Product updated successfully! Please refresh.',
          });
          navigation.goBack();
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Update failed',
            text2: 'Unable to update the product.',
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
        <ActivityIndicator size="large" color={colors.textLinkColor} />
        <Text style={{color: colors.textColor}}>Fetching product...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.appBackground},
      ]}>
      <Title text="Edit Product" textAlign="left" style={styles.topTitle} />

      <Text style={[styles.description, {color: colors.textColor}]}>
        Product Name
      </Text>
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Product Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Text style={[styles.description, {color: colors.textColor}]}>
        Description
      </Text>
      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Text style={[styles.description, {color: colors.textColor}]}>Price</Text>
      <Controller
        control={control}
        name="price"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Price"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Button
        title="Pick Images (Max 5)"
        onPress={pickImages}
        variant="confirm"
        style={styles.imagePicker}
      />
      <ScrollView horizontal>
        {images.map((img, i) => (
          <View key={i} style={styles.imageWrapper}>
            <Image source={{uri: img.uri}} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() =>
                setImages(images.filter((_, index) => index !== i))
              }>
              <Text style={styles.removeIconText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={[styles.mapLabel, {color: colors.textColor}]}>
        Select Location
      </Text>
      <MapView
        style={styles.map}
        onPress={onMapPress}
        initialRegion={{
          latitude: location?.latitude ?? 34.0213,
          longitude: location?.longitude ?? 35.6471,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          />
        )}
      </MapView>

      <Button
        title="Update Product"
        onPress={handleSubmit(onSubmit)}
        variant="confirm"
      />
      <Button
        title="Reset"
        variant="logout"
        onPress={() => {
          reset();
          setImages([]);
          setLocation(null);
        }}
      />
    </ScrollView>
  );
}
