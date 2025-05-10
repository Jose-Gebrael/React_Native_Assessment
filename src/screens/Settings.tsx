import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './Settings.styles';
import {Title} from '../components/atoms/Title';
import {Button} from '../components/atoms/Button';
import {ToggleSwitch} from '../components/atoms/ToggleSwitch';
import {Separator} from '../components/atoms/Separator';
import {useAuth} from '../context/AuthContext';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <Title text="Settings" textAlign="left" />
      <Text style={styles.subtitle}>Theme</Text>
      <ToggleSwitch
        label="Dark Mode"
        value={isDarkMode}
        onToggle={setIsDarkMode}
      />
      <Separator marginVertical={5} />
      <Separator marginVertical={5} />

      <Button title="Logout" onPress={logout} variant="logout" />
    </View>
  );
}
