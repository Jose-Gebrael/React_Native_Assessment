import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
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

export default function Login() {
  const {colors} = useThemeStore();
  const {login} = useAuthStore();
  const navigation = useNavigation<AppStackNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'eurisko@gmail.com', //Empty this before Handing in assignment
      password: 'academy2025', //Empty this before Handing in assignment
    },
  });

  //handle a splashscreen to load the authstore and themestore.
  //const hydrated = useThemeStore(state => state.hydrated);
  //if (!hydrated) return <SplashScreen />;

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);

    setTimeout(() => {
      const {username, password} = data;

      if (username === 'eurisko@gmail.com' && password === 'academy2025') {
        const userId = '99'; //simulating the API gave us this user id
        login('sampleAccessToken', userId);
      } else {
        Alert.alert('Error', 'Invalid credentials.');
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Welcome" textAlign="center" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        Sign in to your account to continue
      </Text>

      <Controller
        control={control}
        name="username"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="mail"
              placeholder="Enter your email (eurisko@gmail.com)"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
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
              placeholder="Enter your password (academy2025)"
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

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{marginTop: 16}}
        />
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
