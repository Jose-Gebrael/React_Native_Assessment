import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Settings from '../../screens/Settings';
import Profile from '../../screens/Profile';
import Feather from 'react-native-vector-icons/Feather';
import {useThemeStore} from '../../store/themeStore';

const Tab = createBottomTabNavigator();

const screenOptions =
  (colors: any) =>
  ({route}: {route: any}) => ({
    headerTitle: '',
    headerStyle: {
      backgroundColor: colors.appBackground,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    tabBarIcon: ({color, size}: {color: string; size: number}) => {
      const icons: Record<string, string> = {
        Home: 'home',
        Settings: 'settings',
        Profile: 'user',
      };
      const iconName = icons[route.name] || 'circle';

      return <Feather name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors.textLinkColor,
    tabBarInactiveTintColor: colors.placeholderTextColor,
    tabBarStyle: {
      backgroundColor: colors.appBackground,
      borderTopColor: colors.borderColor,
      height: 60,
      paddingBottom: 5,
    },
    headerShown: true,
  });

export default function BottomTabs() {
  const {colors} = useThemeStore();

  return (
    <Tab.Navigator screenOptions={screenOptions(colors)}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
