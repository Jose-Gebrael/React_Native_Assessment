import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthenticationStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  OTP: {email: string};
};

export type ProtectedStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  Home: undefined;
  ProductDetails: {productId: string};
  Settings: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  CreateProduct: undefined;
  ProductEdit: { productId: string };
  MyProducts: undefined;
};


export type BottomTabsParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AppStackParamList = AuthenticationStackParamList &
  ProtectedStackParamList;

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
