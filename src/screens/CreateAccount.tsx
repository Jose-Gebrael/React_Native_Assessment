import React, {useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './CreateAccount.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';
import {useThemeStore} from '../store/themeStore';
import {
  createAccountSchema,
  CreateAccountSchemaFormData,
} from '../schemas/CreateAccountSchema';
import {launchImageLibrary} from 'react-native-image-picker';
import {useCreateUserMutation} from '../queries';
import {CreateUserPayload} from '../api/createUserAPI';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';

export default function CreateAccount() {
  const {mutate} = useCreateUserMutation();
  const {colors} = useThemeStore();
  const navigation = useNavigation<AppStackNavigationProp>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<CreateAccountSchemaFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: '',
      password: '123123',
      firstName: 'firstName-R',
      lastName: 'lastName-R',
    },
  });

  // Pick image handler
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setValue('profileImage', {
          uri: asset.uri!,
          name: asset.fileName || 'profile.jpg',
          type: asset.type || 'image/jpeg',
        });
      }
    });
  };

  const handleCreateAccount = async (data: CreateAccountSchemaFormData) => {
    setLoading(true);

    const payload: CreateUserPayload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage,
    };

    mutate(payload, {
      onSuccess: res => {
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: res.data?.message || 'Check your email for the OTP.',
        });
        navigation.navigate('OTP', {email: data.email});
        setLoading(false);
      },
      onError: err => {
        const error = err as AxiosError<any>;

        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2:
            error.response?.data?.error?.message || 'Something went wrong.',
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000); //just a simulation bcz the api is too fast lmao
      },
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Create your Account" textAlign="center" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        Please enter your information below
      </Text>

      <Controller
        control={control}
        name="firstName"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="user"
              placeholder="Enter your first name"
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="user"
              placeholder="Enter your last name"
              value={value}
              onChangeText={onChange}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="mail"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="lock"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              isPassword={true}
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="profileImage"
        render={({field: {value}}) => (
          <View style={styles.imagePickerContainer}>
            <Button title="Upload Profile Image" onPress={pickImage} />
            {value?.uri && (
              <Image source={{uri: value.uri}} style={styles.profileImage} />
            )}
          </View>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <Button
          title="Create Account"
          onPress={handleSubmit(handleCreateAccount)}
          variant="confirm"
        />
      )}

      <Text style={[styles.footerText, {color: colors.textColor}]}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.goBack()}
          style={[styles.linkText, {color: colors.textLinkColor}]}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}
