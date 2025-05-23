import React from 'react';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useThemeStore} from '../store/themeStore';
import styles from './Cart.styles';

export default function Cart() {
  const {colors} = useThemeStore();

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Feather name="shopping-cart" size={64} color={colors.textColor} />
      <Text style={[styles.text, {color: colors.textColor}]}>
        Your cart is empty
      </Text>
    </View>
  );
}
