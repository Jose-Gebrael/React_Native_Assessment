import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Settings from '../../screens/Settings';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

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
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
