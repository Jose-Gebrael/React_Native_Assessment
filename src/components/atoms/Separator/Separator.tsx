import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styles from './Separator.styles';
import {useTheme} from '../../../context/ThemeContext';

interface SeparatorProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Separator({
  thickness = 2,
  marginVertical = 8,
  style,
}: SeparatorProps) {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: colors.textColor,
          height: thickness,
          marginVertical: marginVertical,
        },
        style,
      ]}
    />
  );
}
