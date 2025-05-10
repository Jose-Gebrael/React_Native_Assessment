import React from 'react';
import {useTheme} from '../../../context/ThemeContext';
import {
  View,
  Text,
  Switch,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './ToggleSwitch.styles';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function ToggleSwitch({
  label,
  value,
  onToggle,
  containerStyle,
  labelStyle,
}: ToggleSwitchProps) {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather
        name="moon"
        size={24}
        style={[styles.icon, {color: colors.textColor}]}
      />
      <Text style={[styles.label, labelStyle, {color: colors.textColor}]}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        thumbColor={value ? '#00C896' : '#f4f3f4'}
        trackColor={{false: '#767577', true: '#4CAF50'}}
      />
    </View>
  );
}
