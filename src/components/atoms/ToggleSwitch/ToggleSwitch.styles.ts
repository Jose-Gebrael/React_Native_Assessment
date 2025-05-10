import {StyleSheet} from 'react-native';
import globalColors from '../../../details/styles/globalColors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  icon: {
    color: globalColors.textColor,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: globalColors.textColor,
  },
});

export default styles;
