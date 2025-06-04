import React from 'react';
import {View} from 'react-native';
import styles from './SkeletonCard.styles';

export default function SkeletonCard() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.titlePlaceholder} />
      <View style={styles.pricePlaceholder} />
    </View>
  );
}
