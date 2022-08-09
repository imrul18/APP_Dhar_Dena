import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    margin: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    width: 200,
  },
  cardtext: {
    fontSize: 20,
  },
  button: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    width: 120,
    height: 30,
    backgroundColor: '#2288DD',
    textAlign: 'center',
    borderRadius: 10,
  },
  category_card: {
    backgroundColor: '#2288DD',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteButton: {
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#f00',
  },
  addButton: {
    position: 'absolute',
    right: 50,
    bottom: 70,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    width: 250,
    textAlign: 'center',
  },
  saveButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor:'#F69E01',
    backgroundColor: '#F69E01',
    color: '#fff',
    margin: 25,
    padding: 5,
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
export default styles;