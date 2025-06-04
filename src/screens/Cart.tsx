import React from 'react';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useThemeStore} from '../store/themeStore';
import {useItemStore} from '../store/itemStore';
import styles from './Cart.styles';
import {Title} from '../components/atoms/Title';
import {CartItem} from '../components/molecules/CartItem';

export default function Cart() {
  const {colors} = useThemeStore();
  const cart = useItemStore(state => state.cart);

  if (cart.length === 0) {
    return (
      <View style={[styles.containerEmpty, {backgroundColor: colors.appBackground}]}>
        <Feather name="shopping-cart" size={64} color={colors.textColor} />
        <Text style={[styles.text, {color: colors.textColor}]}>
          Your cart is empty
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Cart Items" />
      {cart.map(item => (
        <CartItem key={item.productId} item={item} colors={colors} />
      ))}
    </View>
  );
}
