import React from 'react';
import {Text, TextStyle, StyleProp} from 'react-native';
import styles from './Title.styles';
import {useThemeStore} from '../../../store/themeStore';

interface TitleProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

export default function Title({text, textAlign = 'center', style}: TitleProps) {
  const {colors} = useThemeStore();
  return (
    <Text style={[styles.title, {textAlign}, style, {color: colors.textColor}]}>
      {text}
    </Text>
  );
}
