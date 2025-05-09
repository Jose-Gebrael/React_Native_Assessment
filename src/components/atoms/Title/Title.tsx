import React from 'react';
import { Text } from 'react-native';
import styles from './Title.styles';

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Text style={styles.title}>{text}</Text>;
}
