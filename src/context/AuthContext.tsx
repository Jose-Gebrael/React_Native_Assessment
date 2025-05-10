// src/context/AuthContext.tsx
import React, {createContext, useState, ReactNode, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = async (token: string, userId: string) => {
    await AsyncStorage.setItem('accessToken', token);
    await AsyncStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, userId, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
