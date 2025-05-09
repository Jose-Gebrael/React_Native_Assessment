import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationStack, ProtectedStack } from '../stacks';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const isAuthenticated = false; // Replace with your actual login condition later

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="ProtectedStack" component={ProtectedStack} />
      ) : (
        <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} />
      )}
    </Stack.Navigator>
  );
}
