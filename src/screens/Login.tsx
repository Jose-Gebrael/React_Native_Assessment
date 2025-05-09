import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Login.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import Feather from 'react-native-vector-icons/Feather';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Title text="Welcome Back" />
      <Text style={styles.subtitle}>Sign in to your account to continue</Text>

      <TextInput
        iconName="mail"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

        <TextInput
          iconName="lock"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />

      <Button title="Sign In" onPress={() => {}} />

      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
      </Text>
    </View>
  );
}
