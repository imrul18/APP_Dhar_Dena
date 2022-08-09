import AsyncStorage from '@react-native-async-storage/async-storage';

const loadAllData = async () => {
  const data = {
    last_person: (await AsyncStorage.getItem('last_person')) ?? 0,
    last_transaction: (await AsyncStorage.getItem('last_transaction')) ?? 0,
    category: JSON.parse(await AsyncStorage.getItem('category')) ?? [
      {id: 1, name: 'দোকানদার'},
      {id: 2, name: 'কাস্টমার'},
      {id: 3, name: 'সাধারণ'},
    ],
    person: JSON.parse(await AsyncStorage.getItem('person')) ?? [],
    transaction: JSON.parse(await AsyncStorage.getItem('transaction')) ?? [],
  };
  return data;
};

const setLastPerson = async data => {
  await AsyncStorage.setItem('last_person', JSON.stringify(data));
};
const setLastTransaction = async data => {
  await AsyncStorage.setItem('last_transaction', JSON.stringify(data));
};
const setCategory = async () => {};

const setPerson = async data => {
  await AsyncStorage.setItem('person', JSON.stringify(data));
};
const setTransaction = async data => {
  await AsyncStorage.setItem('transaction', JSON.stringify(data));
};

const LocalStorage = {
  loadAllData,
  setLastPerson,
  setLastTransaction,
  setCategory,
  setPerson,
  setTransaction,
};

export default LocalStorage;
