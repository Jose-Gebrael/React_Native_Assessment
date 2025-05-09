import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/navigate';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
