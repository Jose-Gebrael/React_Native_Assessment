import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import styles from './OTP.styles';
import {useAuth} from '../context/AuthContext';

export default function OTP() {
  const {login} = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = () => {
    setLoading(true);

    setTimeout(() => {
      if (otp === '1234') {
        setLoading(false);
        Alert.alert('Success', `OTP verified successfully!`);
        const userID = '55'; //This will be replaced by actual userID when we get API
        login('sampleAccessToken', userID);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Invalid OTP');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Title text="Verify Account" textAlign="center" />
      <Text style={styles.subtitle}>
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
