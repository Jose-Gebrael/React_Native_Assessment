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
    // width: '100%',
    // height: 300,
    // borderRadius: 10,
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
  imageSwiper: {
    height: 300,
    marginBottom: 20,
    marginTop: 20,
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
  },
  mapStyle: {
    flex: 1,
  },
  ownerActions: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  buttons: {
    width: 100,
    marginBottom: 20,
  },
  modalPage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgOverlay: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  imageLoading: {
    position: 'absolute',
    zIndex: 1,
  },
  imgViewUp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgViewLow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  IMGstyle: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height * 0.6,
    borderRadius: 10,
  },
  quantityInCart: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
  },
});

export default styles;
