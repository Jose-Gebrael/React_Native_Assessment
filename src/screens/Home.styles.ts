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
    fontSize: PixelRatio.get() * 6,
    textAlign: 'left',
    marginBottom: 20,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingVertical: 10,
  },
  ActivityIndicator: {
    marginVertical: 10,
  },
  loadingInitialContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingInitialText: {
    marginTop: 10,
    fontSize: 16,
  },
  loadingMoreContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingMoreText: {
    marginTop: 5,
    fontSize: 12,
  },
  searchView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterStyle: {
    marginLeft: 10,
  },
  filterDropdown: {
    borderRadius: 10,
    padding: 15,
  },
  asc: {
    paddingVertical: 10,
  },
  desc: {
    paddingVertical: 10,
  },
});

export default styles;
