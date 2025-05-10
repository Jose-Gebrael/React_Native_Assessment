import React, { useState } from 'react';
import globalColors from '../../../details/styles/globalColors';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './TextInput.styles';

interface TextInputPropsExtended extends TextInputProps {
  iconName?: string;
  isPassword?: boolean;
  isSearch?: boolean;
  isNumeric?: boolean; // ✅ New: Numeric Keyboard without Icon
}

export default function TextInput({
  iconName,
  isPassword = false,
  isSearch = false,
  isNumeric = false,
  ...props
}: TextInputPropsExtended) {
  const [passwordVisible, setPasswordVisible] = useState(!isPassword);

  return (
    <View style={styles.inputContainer}>
      {/* Display Icons */}
      {isSearch ? (
        <Feather name="search" size={20} style={styles.icon} />
      ) : iconName ? (
        <Feather name={iconName} size={20} style={styles.icon} />
      ) : null}

      {/* Text Input */}
      <RNTextInput
        style={styles.input}
        {...props}
        secureTextEntry={isPassword && !passwordVisible}
        placeholderTextColor={globalColors.placeholderTextColor}
        keyboardType={isNumeric ? 'numeric' : 'default'} // ✅ Numeric Keyboard without Icon
      />

      {/* Password Visibility Toggle */}
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
