import {StyleSheet} from 'react-native';
import globalStyles from '../details/styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  title: {
    ...globalStyles.text,
    fontSize: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default styles;
