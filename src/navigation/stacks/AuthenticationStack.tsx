import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, CreateAccount, OTP } from '../../screens';

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
}
