import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import globalStyles from '../details/styles/globalStyles';
import globalColors from '../details/styles/globalColors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 15,
  },
  detailsContainer: {
    padding: 16,
    flex: 1,
  },
  subtitle: {
    fontFamily: 'GothamBook',
    fontSize: PixelRatio.get() * 8,
    textAlign: 'left',
    color: globalColors.textColor,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 12,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: globalColors.textColor,
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
