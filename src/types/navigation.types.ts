import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthenticationStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  OTP: undefined;
};

export type ProtectedStackParamList = {
  Home: undefined;
  ProductDetails: {productId: string};
  Settings: undefined;
  BottomTabs: undefined;
};

export type AppStackParamList = AuthenticationStackParamList &
  ProtectedStackParamList;

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
