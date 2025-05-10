import React from 'react';
import {Text, TextStyle} from 'react-native';
import styles from './Title.styles';

interface TitleProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
}

export default function Title({text, textAlign = 'center'}: TitleProps) {
  return <Text style={[styles.title, {textAlign}]}>{text}</Text>;
}
