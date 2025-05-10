import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styles from './Separator.styles';
import globalColors from '../../../details/styles/globalColors';

interface SeparatorProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Separator({
  color = globalColors.seperatorColor,
  thickness = 2,
  marginVertical = 8,
  style,
}: SeparatorProps) {
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical,
        },
        style,
      ]}
    />
  );
}
