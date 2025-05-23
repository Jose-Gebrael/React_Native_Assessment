import React from 'react';
import {View, Text} from 'react-native';
import styles from './Settings.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {ToggleSwitch} from '../components/atoms/ToggleSwitch';
import {Separator} from '../components/atoms/Separator';
import {useAuthStore} from '../store/authStore';
import {useThemeStore} from '../store/themeStore';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';

export default function Settings() {
  const {colors, isDarkMode, toggleTheme} = useThemeStore();
  const {logout} = useAuthStore();
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Settings" textAlign="left" />
      <Text style={[styles.subtitle, {color: colors.textColor}]}>Theme</Text>
      <ToggleSwitch
        label="Dark Mode"
        value={isDarkMode}
        onToggle={toggleTheme}
      />
      <Separator marginVertical={5} />
      <Separator marginVertical={5} />

      <Text style={[styles.subtitle, {color: colors.textColor}]}>Profile</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileEdit')}
        style={styles.rowContainer}>
        <Feather
          name="user"
          size={20}
          color={colors.textColor}
          style={styles.lefticon}
        />
        <Text style={[styles.midText, {color: colors.textColor}]}>
          Edit Profile
        </Text>
        <Feather
          name="arrow-right"
          size={20}
          color={colors.textColor}
          style={styles.righticon}
        />
      </TouchableOpacity>
      <Separator marginVertical={5} />
      <Separator marginVertical={5} />

      <Text style={[styles.subtitle, {color: colors.textColor}]}>Products</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('MyProducts')}
        style={styles.rowContainer}>
        <Feather
          name="shopping-bag"
          size={20}
          color={colors.textColor}
          style={styles.lefticon}
        />
        <Text style={[styles.midText, {color: colors.textColor}]}>
          My Products
        </Text>
        <Feather
          name="arrow-right"
          size={20}
          color={colors.textColor}
          style={styles.righticon}
        />
      </TouchableOpacity>
      <Separator marginVertical={5} />
      <Separator marginVertical={5} />

      <Button title="Logout" onPress={logout} variant="logout" />
    </View>
  );
}
