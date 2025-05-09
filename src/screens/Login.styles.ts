// src/screens/Login.styles.ts
import {StyleSheet} from 'react-native';
import globalStyles from '../details/styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ccc',
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 12,
  },
  linkText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default styles;
