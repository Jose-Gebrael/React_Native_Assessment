import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './TextInput.styles';

interface TextInputPropsExtended extends TextInputProps {
  iconName?: string;
}

export default function TextInput({ iconName, ...props }: TextInputPropsExtended) {
  return (
    <View style={styles.inputContainer}>
      {iconName && <Feather name={iconName} size={20} style={styles.icon} />}
      <RNTextInput style={styles.input} {...props} />
    </View>
  );
}
