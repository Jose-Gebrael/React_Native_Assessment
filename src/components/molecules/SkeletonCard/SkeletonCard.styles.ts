import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  skeletonCard: {
    width: '48%',
    backgroundColor: '#E1E9EE',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  titlePlaceholder: {
    height: 16,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginBottom: 6,
    width: '80%',
  },
  pricePlaceholder: {
    height: 14,
    backgroundColor: '#bbb',
    borderRadius: 4,
    width: '40%',
  },
});

export default styles;
