import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  subcontainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: '#FFF',
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
    color: '#FFF',
  },
  img: {
    width: 150,
    height: 150,
  }
});