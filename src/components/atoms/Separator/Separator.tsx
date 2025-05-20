import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styles from './Separator.styles';
import {useThemeStore} from '../../../store/themeStore';

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
  const {colors} = useThemeStore();
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
