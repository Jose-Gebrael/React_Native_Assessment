import React from 'react';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {RootStack} from './src/navigation/navigate';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from './src/types/navigation.types';

const queryClient = new QueryClient();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['react_native_assessment://'],
  config: {
    screens: {
      ProtectedStack: {
        screens: {
          ProductDetails: 'product/:productId',
        },
      },
    },
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer linking={linking}>
          <RootStack />
        </NavigationContainer>
        <Toast />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
