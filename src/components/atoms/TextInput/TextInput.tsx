import React, {useState} from 'react';
import {useTheme} from '../../../context/ThemeContext';
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
  isNumeric?: boolean;
}

export default function TextInput({
  iconName,
  isPassword = false,
  isSearch = false,
  isNumeric = false,
  ...props
}: TextInputPropsExtended) {
  const {colors} = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(!isPassword);

  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor: colors.inputBackground},
      ]}>
      {isSearch ? (
        <Feather
          name="search"
          size={20}
          style={[styles.icon, {color: colors.textColor}]}
        />
      ) : iconName ? (
        <Feather
          name={iconName}
          size={20}
          style={[styles.icon, {color: colors.textColor}]}
        />
      ) : null}

      <RNTextInput
        style={[styles.input, {color: colors.textColor}]}
        {...props}
        secureTextEntry={isPassword && !passwordVisible}
        placeholderTextColor={colors.placeholderTextColor}
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />

      {isPassword && (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={20}
            style={[styles.icon, {color: colors.textColor}]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
