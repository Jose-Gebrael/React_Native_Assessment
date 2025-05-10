import React, {useState, useLayoutEffect} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import styles from './OTP.styles';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

export default function OTP() {
  const {login} = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.textColor,
    });
  }, [navigation, colors]);

  const handleVerifyOTP = () => {
    setLoading(true);

    setTimeout(() => {
      if (otp === '1234') {
        setLoading(false);
        Alert.alert('Success', `OTP verified successfully!`);
        const userID = '55'; // This will be replaced by actual userID when we get API
        login('sampleAccessToken', userID);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Invalid OTP');
      }
    }, 2000);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Verify Account" textAlign="center" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>
        We've sent you a verification code to your email (1234)
      </Text>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        isNumeric={true}
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{marginTop: 16}}
        />
      ) : (
        <Button title="Verify" onPress={handleVerifyOTP} />
      )}
    </View>
  );
}
