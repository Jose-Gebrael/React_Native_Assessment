import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/navigation/navigate';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
