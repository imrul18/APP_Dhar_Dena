import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import backgroundImage from './../assets/background.jpg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import LocalStorage from '../component/LoaclStorage';
import {loadLTI, loadPerson, loadTransaction} from '../redux/StoryStore';
import styles from '../style/styles';

const AddTransaction = ({navigation, route}) => {
  const id = route.params.id;
  const type = route.params.type;

  const dispatch = useDispatch();
  const {transaction, last_transaction, person} = useSelector(
    state => state.storyStore,
  );

  const [data, setData] = useState({
    amount: '',
    details: '',
  });

  let transactionData = [...transaction];
  let personData = [...person];

  const AddTransaction = async () => {
    if (data?.amount?.length < 1 || data?.amount < 0 || isNaN(data.amount)) {
      Toast.show({
        type: 'error',
        text1: 'টাকার পরিমান ভুল হয়েছে',
        text2: `সঠিক পরিমান ব্যবহার করুন`,
      });
    } else {
      const x = {
        ...data,
        amount: type ? data?.amount : -1 * data?.amount,
        id: last_transaction + 1,
        person_id: id,
        date: new Date().toString(),
      };
      transactionData.unshift(x);
      personData = personData.map(item => {
        if (item.id == id) {
          return {
            ...item,
            balance: type
              ? parseInt(item?.balance) + parseInt(data?.amount)
              : parseInt(item?.balance) - parseInt(data?.amount),
          };
        } else {
          return item;
        }
      });
      await LocalStorage.setPerson(personData);
      dispatch(loadPerson(personData));

      await LocalStorage.setLastTransaction(last_transaction + 1);
      await LocalStorage.setTransaction(transactionData);
      dispatch(loadTransaction(transactionData));
      dispatch(loadLTI(last_transaction + 1));
      Toast.show({
        type: 'success',
        text1: 'লেনদেন সম্পন্ন হয়েছে',
        text2: `${data.amount} টাকার লেনদেন সম্পন্ন হয়েছে`,
      });
      navigation.goBack();
    }
  };

  const changeData = (value, name) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.container}>
      <View style={{paddingVertical: 50}}>
        <View>
          <TextInput
            placeholder="টাকার পরিমাণ"
            style={styles.input}
            onChangeText={value => changeData(value, 'amount')}
            value={data.amount}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="বিস্তারিত"
            style={styles.input}
            onChangeText={value => changeData(value, 'details')}
            value={data.details}
          />
        </View>
        <TouchableOpacity onPress={AddTransaction}>
          <Text style={styles.saveButton}>যোগ করুন</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AddTransaction;
