import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Login.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Title text="Create your Account" />
      <Text style={styles.subtitle}>Please enter your information below</Text>

      <TextInput
        iconName="mail"
        placeholder="Enter your email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        iconName="lock"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        autoCapitalize="none"
      />

      <Button title="Create Account" onPress={() => {}} />

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.goBack()}
          style={styles.linkText}>
          Log in
        </Text>
      </Text>
    </View>
  );
}
