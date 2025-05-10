import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import styles from './Title.styles';

interface TitleProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

export default function Title({ text, textAlign = 'center', style }: TitleProps) {
  return <Text style={[styles.title, { textAlign }, style]}>{text}</Text>;
}
