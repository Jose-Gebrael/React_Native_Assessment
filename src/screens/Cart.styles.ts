import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerEmpty: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  CartItem: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    borderWidth: 3,
  },
  hiddenDeleteContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  deleteButtonView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartItemContainer: {
    marginBottom: 16,
  },
  CartTitle: {
    fontSize: 24,
    alignSelf: 'flex-start',
  },
});

export default styles;
