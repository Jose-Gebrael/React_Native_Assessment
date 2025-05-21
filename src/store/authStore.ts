import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

interface AuthState {
  isLoggedIn: boolean;
  hydrated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  getRefreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      hydrated: false,

      login: async (accessToken, refreshToken) => {
        await AsyncStorage.setItem('accessToken', accessToken); // optional for quick access
        await Keychain.setGenericPassword(
          'auth',
          JSON.stringify({accessToken, refreshToken}),
        );
        set({isLoggedIn: true});
      },

      logout: async () => {
        await AsyncStorage.removeItem('accessToken');
        await Keychain.resetGenericPassword();
        set({isLoggedIn: false});
      },

      getAccessToken: async () => {
        const creds = await Keychain.getGenericPassword();
        if (!creds) {
          return null;
        }
        const parsed = JSON.parse(creds.password);
        return parsed.accessToken;
      },

      getRefreshToken: async () => {
        const creds = await Keychain.getGenericPassword();
        if (!creds) {
          return null;
        }
        const parsed = JSON.parse(creds.password);
        return parsed.refreshToken;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => {
        return () => {
          useAuthStore.setState({hydrated: true});
        };
      },
    },
  ),
);
