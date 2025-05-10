import {StyleSheet} from 'react-native';
import globalColors from '../../../details/styles/globalColors';

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: globalColors.blueButton,
  },
  confirmButtonText: {
    color: globalColors.buttonTextColor,
  },
  logoutButton: {
    backgroundColor: globalColors.redButton,
  },
  logoutButtonText: {
    color: globalColors.buttonTextColor,
  },
});

export default styles;
