import React, {useRef, useMemo} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from '../../../screens/Cart.styles';
import {useItemStore} from '../../../store/itemStore';
import {Title} from '../../atoms/Title';
import {useThemeStore} from '../../../store/themeStore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = -75;
interface CartItem {
  productId: string;
  title: string;
  description: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
}
export default function CartItem({item}: CartItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  const {colors} = useThemeStore();
  const removeFromCart = useItemStore.getState().removeFromCart;
  const decreaseQuantity = useItemStore.getState().decreaseQuantity;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10,
        onPanResponderMove: (_, gestureState) => {
          translateX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < SWIPE_THRESHOLD) {
            Animated.timing(translateX, {
              toValue: -SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }).start(() => removeFromCart(item.productId));
          } else if (gestureState.dx > 50 && item.quantity > 1) {
            Animated.timing(translateX, {
              toValue: 100,
              duration: 150,
              useNativeDriver: true,
            }).start(() => {
              decreaseQuantity(item.productId);
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            });
          } else if (gestureState.dx > 50 && item.quantity === 1) {
            // Swipe right & quantity = 1: Remove item
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }).start(() => removeFromCart(item.productId));
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [
      item.quantity,
      item.productId,
      removeFromCart,
      decreaseQuantity,
      translateX,
    ],
  );

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.hiddenDeleteContainer}>
        <TouchableOpacity
          onPress={() => removeFromCart(item.productId)}
          style={styles.deleteButton}>
          <View style={styles.deleteButtonView}>
            <Text style={styles.deleteText}>Remove 1 item</Text>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.CartItem,
          {
            borderColor: colors.borderColor,
            transform: [{translateX}],
            backgroundColor: colors.appBackground,
          },
        ]}>
        <Title
          style={[styles.CartTitle, {color: colors.textColor}]}
          text={item.title}
        />
        <Text style={[styles.text, {color: colors.textColor}]}>
          {item.description}
        </Text>
        <Text style={{color: colors.textColor}}>Quantity: {item.quantity}</Text>
      </Animated.View>
    </View>
  );
}
