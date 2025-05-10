import {StyleSheet, PixelRatio} from 'react-native';
import globalStyles from '../details/styles/globalStyles';
import globalColors from '../details/styles/globalColors';

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
    color: globalColors.textColor,
    marginBottom: 20,
  },
  footerText: {
    fontFamily: 'GothamBook',
    textAlign: 'center',
    color: globalColors.textColor,
    marginTop: 12,
  },
  linkText: {
    color: globalColors.textLinkColor,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default styles;
