import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import styles from './OTP.styles';
import {useThemeStore} from '../store/themeStore';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '../types/navigation.types';
import Toast from 'react-native-toast-message';
import {useOTPMutation} from '../queries';
import {useResendOTPMutation} from '../queries';
import {AppStackNavigationProp} from '../types/navigation.types';
import {AxiosError} from 'axios';

type OTPRouteProp = RouteProp<AppStackParamList, 'OTP'>;

export default function OTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const {colors} = useThemeStore();
  const route = useRoute<OTPRouteProp>();
  const {email} = route.params;
  const navigation = useNavigation<AppStackNavigationProp>();
  const {mutate: sendOTP} = useOTPMutation();
  const {mutate: resendOTP} = useResendOTPMutation();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [cooldown]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.textColor,
    });
  }, [navigation, colors]);

  const handleVerifyOTP = () => {
    setLoading(true);

    sendOTP(
      {email, otp},
      {
        onSuccess: res => {
          Toast.show({
            type: 'success',
            text1: 'OTP Verified',
            text2: res?.message || 'Please login to proceed',
          });
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        },
        onError: err => {
          const error = err as AxiosError<any>;
          Toast.show({
            type: 'error',
            text1: 'Verification Failed',
            text2: error.response?.data?.error?.message || 'Invalid OTP',
          });
          setLoading(false);
        },
      },
    );
  };

  const handleResendOTP = () => {
    resendOTP(
      {email},
      {
        onSuccess: res => {
          Toast.show({
            type: 'success',
            text1: 'OTP Sent',
            text2: res?.message || 'Check your inbox.',
          });
        },
        onError: err => {
          const error = err as AxiosError<any>;
          Toast.show({
            type: 'error',
            text1: 'Failed to Resend OTP',
            text2: error.response?.data?.error?.message || 'Please try again.',
          });
        },
      },
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Verify Account" textAlign="center" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        Please check your email, we've sent you a verification code.
      </Text>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        isNumeric={true}
        editable={!loading}
      />

      <Text style={[styles.noCodeText, {color: colors.textColor}]}>
        Didn't receive a code?{' '}
        {cooldown > 0 ? (
          <Text style={[styles.linkText, {color: colors.textLinkColor}]}>
            ({cooldown}s)
          </Text>
        ) : (
          <Text
            onPress={() => {
              handleResendOTP();
              setCooldown(30); // start countdown
            }}
            style={[styles.linkText, {color: colors.textLinkColor}]}>
            Click Here
          </Text>
        )}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <Button title="Verify" onPress={handleVerifyOTP} />
      )}
    </View>
  );
}
