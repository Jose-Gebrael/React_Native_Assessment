import {StyleSheet, PixelRatio} from 'react-native';
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
    fontSize: PixelRatio.get() * 8,
    textAlign: 'left',
    color: globalColors.textColor,
  },
});

export default styles;
