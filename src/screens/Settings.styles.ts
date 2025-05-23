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
    fontSize: PixelRatio.get() * 8,
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lefticon: {
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  midText: {
    alignSelf: 'center',
  },
  righticon: {
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
});

export default styles;
