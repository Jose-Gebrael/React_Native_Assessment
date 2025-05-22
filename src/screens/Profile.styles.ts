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
  errortext: {
    color: 'red',
  },
  contentContainerStyle: {
    alignItems: 'center',
    marginTop: 20,
  },
  mainViewStyle: {
    alignItems: 'center',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  initialsBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  initialsStyle: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
