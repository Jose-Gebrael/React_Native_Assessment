import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetails from '../../screens/ProductDetails';
import ProfileEdit from '../../screens/ProfileEdit';
import CreateProduct from '../../screens/CreateProduct';
import ProductEdit from '../../screens/ProductEdit';
import MyProducts from '../../screens/MyProducts';
import {ProtectedStackParamList} from '../../types/navigation.types';
import {useThemeStore} from '../../store/themeStore';

const Stack = createNativeStackNavigator<ProtectedStackParamList>();

export default function ProtectedStack() {
  return (
    <Stack.Navigator
      screenOptions={() => {
        const {colors} = useThemeStore.getState();
        return {
          animation: 'slide_from_right',
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerTintColor: colors.textColor,
          headerStyle: {
            backgroundColor: colors.appBackground,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        };
      }}>
      {/* Bottom Tabs (Home + Settings) */}
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />

      {/* Product Details (Separate Screen) */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ProductEdit"
        component={ProductEdit}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen name="MyProducts" component={MyProducts} />
    </Stack.Navigator>
  );
}
