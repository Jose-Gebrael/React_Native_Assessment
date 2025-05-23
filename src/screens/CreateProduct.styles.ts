import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  imagePicker: {
    marginVertical: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  mapLabel: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
    textAlign: 'justify',
  },
  topTitle: {
    marginTop: 30,
  },
});

export default styles;
