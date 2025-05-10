import {StyleSheet, PixelRatio} from 'react-native';
import globalStyles from '../details/styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontFamily: 'GothamBook',
    fontSize: PixelRatio.get() * 6,
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default styles;
