import React from 'react';
import {View, Text} from 'react-native';
import styles from './Settings.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {ToggleSwitch} from '../components/atoms/ToggleSwitch';
import {Separator} from '../components/atoms/Separator';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

export default function Settings() {
  const {colors, isDarkMode, toggleTheme} = useTheme();
  const {logout} = useAuth();

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

      <Button title="Logout" onPress={logout} variant="logout" />
    </View>
  );
}
