// src/components/atoms/Button/Button.styles.ts
import { StyleSheet } from 'react-native';
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
    backgroundColor: globalColors.blueButton || '#4CAF50', // Default to green
  },
  confirmButtonText: {
    color: globalColors.buttonTextColor || '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: globalColors.redButton || '#E53935', // Default to red
  },
  logoutButtonText: {
    color: globalColors.buttonTextColor || '#FFFFFF',
  },
});

export default styles;
