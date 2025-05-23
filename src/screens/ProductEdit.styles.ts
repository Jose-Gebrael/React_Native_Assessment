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
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },

  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  removeIconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default styles;
