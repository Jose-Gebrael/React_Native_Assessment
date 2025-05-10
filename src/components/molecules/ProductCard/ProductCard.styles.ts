import {StyleSheet} from 'react-native';
import globalColors from '../../../details/styles/globalColors';

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: globalColors.cardBackgroundColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: globalColors.borderColor,
    padding: 10,
    marginBottom: 16,
    width: '48%',
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
    color: globalColors.textLinkColor,
  },
});

export default styles;
