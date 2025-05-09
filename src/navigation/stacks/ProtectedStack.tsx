import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, ProductDetails, Settings} from '../../screens';
import {ProtectedStackParamList} from '../navigation.types';

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export default function ProtectedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
