import {StyleSheet, PixelRatio} from 'react-native';
import globalStyles from '../details/styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'GothamBook',
    fontSize: PixelRatio.get() * 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  noCodeText: {
    fontFamily: 'GothamBook',
    fontSize: PixelRatio.get() * 5,
    marginBottom: 20,
  },
  loader: {
    marginTop: 16,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default styles;
