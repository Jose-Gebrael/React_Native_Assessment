import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, Image, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
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
import {ONESIGNAL_KEY, ONESIGNAL_APPID} from '@env';

function NotiTest(productTitle: string, productId: string) {
  fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${ONESIGNAL_KEY}`, // NEVER expose this in production
    },
    body: JSON.stringify({
      app_id: `${ONESIGNAL_APPID}`,
      included_segments: ['All'],
      headings: {en: 'Product Created!'},
      contents: {
        en: `You just created: ${productTitle}. Click here to check it out!`,
      },
      url: `react_native_assessment://product/${productId}`,
    }),
  })
    .then(res => res.json())
    .then(res => console.log('Notification Sent:', res))
    .catch(err => console.error('Notification Error:', err));
}

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
    Alert.alert(
      'Upload Image',
      'Choose a method',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({mediaType: 'photo'}, response => {
              if (response.assets && response.assets.length > 0) {
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
                if (response.assets && response.assets.length > 0) {
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
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
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

          const productTitle = proddata?.data?.title;
          const productId = proddata?.data?._id;

          if (productTitle && productId) {
            NotiTest(productTitle, productId);
          }

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

      <Button
        title="Pick Images (Max 5)"
        onPress={pickImages}
        variant="confirm" // or "confirm" / "default" based on your style system
        style={styles.imagePicker}
      />

      <ScrollView horizontal>
        {images.map((img, i) => (
          <View key={i} style={styles.imageWrapper}>
            <Image source={{uri: img.uri}} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => {
                const filtered = images.filter((_, index) => index !== i);
                setImages(filtered);
              }}>
              <Text style={styles.removeIconText}>×</Text>
            </TouchableOpacity>
          </View>
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
