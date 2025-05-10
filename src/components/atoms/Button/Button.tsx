import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styles from './Button.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'confirm' | 'logout';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'confirm',
  style,
  textStyle,
}: ButtonProps) {
  const backgroundColor =
    variant === 'confirm'
      ? styles.confirmButton.backgroundColor
      : styles.logoutButton.backgroundColor;
  const textColor =
    variant === 'confirm'
      ? styles.confirmButtonText.color
      : styles.logoutButtonText.color;

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}, style]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
