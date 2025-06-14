import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, CreateAccount, OTP, ForgotPassword} from '../../screens';
import {AuthenticationStackParamList} from '../../types/navigation.types';

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'slide_from_bottom'}}
        name="CreateAccount"
        component={CreateAccount}
      />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
