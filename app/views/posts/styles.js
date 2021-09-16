import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    height: 200,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
  },
  textContainerRow: {
    flex: 1,
  },
  itemImage: {
    width: '100%',
    height: 100,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemContent: {
    color: '#FFF',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5,
  },
});