import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './Login.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import {useAuthStore} from '../store/authStore';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';
import {useThemeStore} from '../store/themeStore';
import {loginSchema, LoginFormData} from '../schemas/LoginSchema';
import {useLoginMutation} from '../queries';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';

export default function Login() {
  const {colors} = useThemeStore();
  const {login} = useAuthStore();
  const {mutate: sendLogin} = useLoginMutation();
  const navigation = useNavigation<AppStackNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '', //i should empty this before Handing in assignment
      password: '123123', //this too
    },
  });

  //handle a splashscreen to load the authstore and themestore.
  //const hydrated = useThemeStore(state => state.hydrated);
  //if (!hydrated) return <SplashScreen />;

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);

    sendLogin(
      {
        email: data.email,
        password: data.password,
        token_expires_in: '1y',
      },
      {
        onSuccess: async res => {
          await login(res.accessToken, res.refreshToken);
          Toast.show({
            type: 'success',
            text1: 'Logged in! Happy Shopping 😊',
          });
          setLoading(false);
          // Navigate to your home/profile/dashboard screen here
        },
        onError: err => {
          const error = err as AxiosError<any>;
          Toast.show({
            type: 'error',
            text1: 'Login failed',
            text2:
              error.response?.data?.error?.message ||
              'Invalid credentials! Keep trying',
          });
          setLoading(false);
        },
      },
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Welcome" textAlign="center" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        Sign in to your account to continue
      </Text>

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

      <Text style={[styles.forgotPasswordText, {color: colors.textColor}]}>
        Forgot your password?{' '}
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={[styles.linkText, {color: colors.textLinkColor}]}>
          Click Here.
        </Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <Button
          title="Sign In"
          onPress={handleSubmit(handleLogin)}
          variant="confirm"
        />
      )}

      <Text style={[styles.footerText, {color: colors.textColor}]}>
        Don't have an account?{' '}
        <Text
          onPress={() => navigation.navigate('CreateAccount')}
          style={[styles.linkText, {color: colors.textLinkColor}]}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
