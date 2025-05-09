import {StyleSheet} from 'react-native';
import globalColors from '../../../details/styles/globalColors';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.inputBackground,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: globalColors.borderColor,
  },
  icon: {
    color: '#ccc',
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: globalColors.textColor,
  },
});

export default styles;
