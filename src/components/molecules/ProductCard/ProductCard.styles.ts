// src/components/atoms/ProductCard/ProductCard.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '48%', // Adjust width for two-column layout
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  productRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default styles;
