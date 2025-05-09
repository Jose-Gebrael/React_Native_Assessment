import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Login.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../navigation/navigation.types';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Title text="Welcome" />
      <Text style={styles.subtitle}>Sign in to your account to continue</Text>

      <TextInput
        iconName="mail"
        placeholder="Enter your email (eurisko@gmail.com)"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        iconName="lock"
        placeholder="Enter your password (academy2025)"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />

      <Button title="Sign In" onPress={() => {}} />

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          onPress={() => navigation.navigate('CreateAccount')}
          style={styles.linkText}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
