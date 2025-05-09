import React, { useState } from 'react';
import { TextInput as RNTextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './TextInput.styles';

interface TextInputPropsExtended extends TextInputProps {
  iconName?: string;
  isPassword?: boolean; // New prop to define if this is a password field
}

export default function TextInput({
  iconName,
  isPassword = false,
  ...props
}: TextInputPropsExtended) {
  const [passwordVisible, setPasswordVisible] = useState(!isPassword); // Password visibility state

  return (
    <View style={styles.inputContainer}>
      {iconName && <Feather name={iconName} size={20} style={styles.icon} />}
      
      <RNTextInput
        style={styles.input}
        {...props}
        secureTextEntry={isPassword && !passwordVisible} // Toggle secure text based on state
      />

      {isPassword && (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
