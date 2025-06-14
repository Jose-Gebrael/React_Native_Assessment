import React, {useEffect} from 'react';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {RootStack} from './src/navigation/navigate';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from './src/types/navigation.types';
import {OneSignal} from 'react-native-onesignal';
import BootSplash from 'react-native-bootsplash';
// import {LogLevel} from 'react-native-onesignal';

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
  //OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize('6cb1ed9a-eb6c-47ec-a915-99eeceb5d2c3');
  OneSignal.Notifications.requestPermission(true);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer linking={linking}>
          <RootStack />
        </NavigationContainer>
        <Toast />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
