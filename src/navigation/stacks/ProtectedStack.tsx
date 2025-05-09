import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, ProductDetails, Settings } from '../../screens';

const Stack = createNativeStackNavigator();

export default function ProtectedStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
