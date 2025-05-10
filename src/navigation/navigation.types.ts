// src/navigation/navigation.types.ts
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Define the stack for authentication screens
export type AuthenticationStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  OTP: undefined;
};

// Define the stack for protected screens (after login)
export type ProtectedStackParamList = {
  Home: undefined;
  ProductDetails: undefined;
  Settings: undefined;
};

// Unified type for the entire app (both stacks)
export type AppStackParamList = AuthenticationStackParamList &
  ProtectedStackParamList;

// Typed navigation prop using the unified AppStackParamList
export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
