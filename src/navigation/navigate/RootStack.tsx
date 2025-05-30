import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationStack, ProtectedStack} from '../stacks';
import {useAuthStore} from '../../store/authStore';


const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {isLoggedIn} = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Stack.Screen name="ProtectedStack" component={ProtectedStack} />
      ) : (
        <Stack.Screen
          name="AuthenticationStack"
          component={AuthenticationStack}
        />
      )}
    </Stack.Navigator>
  );
}
