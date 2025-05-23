import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {Title} from '../components/atoms/Title';
import {TextInput} from '../components/atoms/TextInput';
import {Button} from '../components/atoms/Button';
import styles from './CreateProduct.styles';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useCreateProductMutation} from '../queries/useCreateProductMutation';
import {AppStackNavigationProp} from '../types/navigation.types';
import {useNavigation} from '@react-navigation/native';
import {
  CreateProductSchema,
  CreateProductType,
} from '../schemas/createProductSchema';

export default function CreateProduct() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const navigation = useNavigation<AppStackNavigationProp>();
  const [location, setLocation] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const {mutate, isPending} = useCreateProductMutation();



  const {
    control,
    handleSubmit,
    reset,
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

  const pickImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, response => {
      if (response.assets) {
        setImages(response.assets);
      }
    });
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
        text1: 'Location required',
        text2: 'Please select a location on the map.',
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

    mutate(
      {accessToken, formData},
      {
        onSuccess: proddata => {
          Toast.show({
            type: 'success',
            text1: 'Product Created Successfully',
          });

          const productId = proddata?.data?._id;
          if (productId) {
            navigation.navigate('ProductDetails', {productId});
          }
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Creation Failed',
            text2: 'Unable to create product.',
          });
        },
      },
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.appBackground},
      ]}>
      <Title text="Create Product" textAlign="left" style={styles.topTitle} />

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
        Product Description
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

      <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
        <Text style={{color: colors.textColor}}>Pick Images (Max 5)</Text>
      </TouchableOpacity>

      <ScrollView horizontal>
        {images.map((img, i) => (
          <Image key={i} source={{uri: img.uri}} style={styles.imagePreview} />
        ))}
      </ScrollView>

      <Text style={[styles.mapLabel, {color: colors.textColor}]}>
        Select Location
      </Text>
      {/* permissions are crashing my app, look into it and add later */}
      <MapView
        style={styles.map}
        onPress={onMapPress}
        initialRegion={{
          latitude: 34.021345304562765,
          longitude: 35.64711078320793,
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
        title={isPending ? 'Creating...' : 'Create Product'}
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
