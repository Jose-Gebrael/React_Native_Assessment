import {StyleSheet} from 'react-native';
import globalStyles from '../details/styles/globalStyles';
import globalColors from '../details/styles/globalColors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontFamily: 'GothamBook',
    fontSize: 16,
    textAlign: 'left',
    color: globalColors.textColor,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: globalColors.inputBackground,
    borderRadius: 12,
    borderColor: globalColors.listBorderColor,
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    width: '48%', // Two columns
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: globalColors.textColor,
    marginBottom: 4,
    textAlign: 'center',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  productRating: {
    fontSize: 14,
    color: '#FFD700', // Gold star color
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: globalColors.textLinkColor,
  },
});

export default styles;
