import React from 'react';
import {Text, TextStyle, StyleProp} from 'react-native';
import styles from './Title.styles';
import {useTheme} from '../../../context/ThemeContext';

interface TitleProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

export default function Title({text, textAlign = 'center', style}: TitleProps) {
  const {colors} = useTheme();
  return (
    <Text style={[styles.title, {textAlign}, style, {color: colors.textColor}]}>
      {text}
    </Text>
  );
}
