import {StyleSheet} from 'react-native';
import globalStyles from '../details/styles/globalStyles';
import globalColors from '../details/styles/globalColors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: globalColors.textColor,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: globalColors.textColor,
    marginTop: 12,
  },
  linkText: {
    color: globalColors.textLinkColor,
    fontWeight: 'bold',
  },
});

export default styles;
