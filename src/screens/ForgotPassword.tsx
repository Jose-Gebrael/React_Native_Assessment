import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './ForgotPassword.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {useThemeStore} from '../store/themeStore';
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from '../schemas/ForgotPasswordSchema';
import {useForgotPasswordMutation} from '../queries';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {Title} from '../components/atoms/Title';
import {useNavigation} from '@react-navigation/native';

export default function ForgotPassword() {
  const {colors} = useThemeStore();
  const {mutate: forgotPassword} = useForgotPasswordMutation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleForgotPassword = (email: string) => {
    console.log('Sending reset for:', email);
    setLoading(true);
    forgotPassword(
      {email},
      {
        onSuccess: res => {
          Toast.show({
            type: 'success',
            text1: 'Email Sent',
            text2: res?.data?.message || 'Please check your inbox.',
          });
          navigation.goBack();
        },
        onError: err => {
          const error = err as AxiosError<any>;
          Toast.show({
            type: 'error',
            text1: 'Failed to Send',
            text2:
              error.response?.data?.error?.message ||
              'Could not send reset instructions.',
          });
        },
      },
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Forgot Password" textAlign="center" />
      <Text style={[styles.textlabel, {color: colors.textColor}]}>Email</Text>
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
      <Button
        title={loading ? 'Sending...' : 'Send Reset Link'}
        onPress={handleSubmit(data => handleForgotPassword(data.email))}
        variant="confirm"
      />
    </View>
  );
}
