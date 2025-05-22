import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './ProfileEdit.styles';
import {Title} from '../components/atoms/Title';
import {useAuthStore} from '../store/authStore';
import {useThemeStore} from '../store/themeStore';
import {useGetProfileFetch} from '../queries/useGetProfileFetch';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUpdateProfileMutation} from '../queries';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';
import {AxiosError} from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  profileEditSchema,
  ProfileEditFormData,
} from '../schemas/profileEditSchema';
import type {UpdateProfilePayload} from '../api/updateProfileAPI';

export default function ProfileEdit() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigation = useNavigation<AppStackNavigationProp>();
  const {mutate: updateProfile, isPending} = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, [getAccessToken]);

  const {data, isLoading, error} = useGetProfileFetch(accessToken);

  useEffect(() => {
    if (data) {
      const user = data.data.user;
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setProfileImage(
        user.profileImage?.url
          ? `https://backend-practice.eurisko.me${user.profileImage.url}`
          : null,
      );
    }
  }, [data, setValue]);

  const handlePickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.assets && res.assets.length > 0) {
        setProfileImage(res.assets[0].uri || null);
      }
    });
  };

  const onSubmit = (formData: ProfileEditFormData) => {
    const payload: UpdateProfilePayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      accessToken,
    };

    if (
      profileImage &&
      !profileImage.startsWith(
        'https://backend-practice.eurisko.me/api/user/profile',
      )
    ) {
      payload.profileImage = {
        uri: profileImage,
        name: 'profile.jpg',
        type: 'image/jpeg',
      };
    }

    updateProfile(payload, {
      onSuccess: res => {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: res?.data?.message || 'Your profile was successfully updated.',
        });
        navigation.goBack();
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2:
            (err as AxiosError<any>).response?.data?.error?.message ||
            'Could not update your profile. Please try again.',
        });
      },
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Edit your profile" style={styles.titleStyle} />

      {isLoading && (
        <ActivityIndicator size="large" color={colors.textLinkColor} />
      )}
      {error && <Text style={styles.errortext}>Failed to load profile</Text>}

      {data && (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.imageRow}>
            {profileImage ? (
              <Image
                source={{uri: profileImage}}
                style={styles.profileImg}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.initialsBackground}>
                <Text style={styles.initialsStyle}>
                  {data.data.user.firstName?.charAt(0)}
                  {data.data.user.lastName?.charAt(0)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: colors.textColor}]}>
              First Name
            </Text>
            <Controller
              control={control}
              name="firstName"
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.textColor,
                      borderColor: colors.borderColor,
                    },
                  ]}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.firstName && (
              <Text style={styles.errortext}>{errors.firstName.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: colors.textColor}]}>
              Last Name
            </Text>
            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.textColor,
                      borderColor: colors.borderColor,
                    },
                  ]}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.lastName && (
              <Text style={styles.errortext}>{errors.lastName.message}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}>
            <Text style={styles.saveButtonText}>
              {isPending ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
