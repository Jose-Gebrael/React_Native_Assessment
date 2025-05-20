import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  titleColor: string;
  textColor: string;
  appBackground: string;
  blueButton: string;
  redButton: string;
  inputBackground: string;
  borderColor: string;
  placeholderTextColor: string;
  buttonTextColor: string;
  textLinkColor: string;
  listBorderColor: string;
  separatorColor: string;
  cardBackgroundColor: string;
}

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: Theme;
  hydrated: boolean;
}

const lightTheme: Theme = {
  titleColor: '#000000',
  textColor: '#000000',
  appBackground: '#FFFFFF',
  blueButton: '#1C83FF',
  redButton: '#FF6347',
  inputBackground: '#FFFFFF',
  borderColor: '#666666',
  placeholderTextColor: '#999999',
  buttonTextColor: '#FFFFFF',
  textLinkColor: '#1C83FF',
  listBorderColor: '#000000',
  separatorColor: '#000000',
  cardBackgroundColor: '#f8f8f8',
};

const darkTheme: Theme = {
  titleColor: '#FFFFFF',
  textColor: '#E0E0E0',
  appBackground: '#121212',
  blueButton: '#1C83FF',
  redButton: '#FF6347',
  inputBackground: '#1E1E1E',
  borderColor: '#444444',
  placeholderTextColor: '#777777',
  buttonTextColor: '#FFFFFF',
  textLinkColor: '#4CAF50',
  listBorderColor: '#333333',
  separatorColor: '#444444',
  cardBackgroundColor: '#1A1A1A',
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      colors: lightTheme,
      toggleTheme: () => {
        const isDark = !get().isDarkMode;
        set({
          isDarkMode: isDark,
          colors: isDark ? darkTheme : lightTheme,
        });
      },
      hydrated: false,
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({isDarkMode: state.isDarkMode}),
      onRehydrateStorage: () => {
        return state => {
          const isDark = state?.isDarkMode ?? false;
          useThemeStore.setState({
            colors: isDark ? darkTheme : lightTheme,
            hydrated: true,
          });
        };
      },
    },
  ),
);
