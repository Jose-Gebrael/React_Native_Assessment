import React, {useState} from 'react';
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
}

export default function TextInput({
  iconName,
  isPassword = false,
  isSearch = false,
  ...props
}: TextInputPropsExtended) {
  const [passwordVisible, setPasswordVisible] = useState(!isPassword);

  return (
    <View style={styles.inputContainer}>
      {isSearch ? (
        <Feather name="search" size={20} style={styles.icon} />
      ) : iconName ? (
        <Feather name={iconName} size={20} style={styles.icon} />
      ) : null}

      <RNTextInput
        style={styles.input}
        {...props}
        secureTextEntry={isPassword && !passwordVisible}
        placeholderTextColor={globalColors.placeholderTextColor}
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
