import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetails from '../../screens/ProductDetails';
import {ProtectedStackParamList} from '../../types/navigation.types';

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export default function ProtectedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitle: '',
      }}>
      {/* Bottom Tabs (Home + Settings) */}
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />

      {/* Product Details (Separate Screen) */}
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
