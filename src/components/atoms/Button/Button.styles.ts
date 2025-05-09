import { StyleSheet } from 'react-native';
import globalColors from '../../../details/styles/globalColors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalColors.blueButton,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: globalColors.buttonTextColor,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
