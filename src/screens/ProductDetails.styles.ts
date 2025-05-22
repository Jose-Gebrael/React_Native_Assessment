import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import globalStyles from '../details/styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  subtitle: {
    fontFamily: 'GothamBook',
    fontSize: PixelRatio.get() * 8,
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 12,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'justify',
  },
  addToCartButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'GothamBook',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default styles;
