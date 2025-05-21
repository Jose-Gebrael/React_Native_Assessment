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
  footerText: {
    fontFamily: 'GothamBook',
    textAlign: 'center',
    marginTop: 12,
  },
  linkText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
  loader: {
    marginTop: 16,
  },
  imagePickerContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default styles;
