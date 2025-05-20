import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  hydrated: boolean;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      userId: null,
      hydrated: false,

      login: async (token, userId) => {
        await AsyncStorage.setItem('accessToken', token);
        await AsyncStorage.setItem('userId', userId);
        set({isLoggedIn: true, userId});
      },

      logout: async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userId');
        set({isLoggedIn: false, userId: null});
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
      }),
      onRehydrateStorage: () => {
        return () => {
          useAuthStore.setState({hydrated: true});
        };
      },
    },
  ),
);
