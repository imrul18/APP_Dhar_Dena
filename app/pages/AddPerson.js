import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-toast-message';
import backgroundImage from './../assets/background.jpg';

import {useDispatch, useSelector} from 'react-redux';
import LocalStorage from '../component/LoaclStorage';
import {loadLPI, loadPerson} from '../redux/StoryStore';
import styles from '../style/styles';

const AddPerson = ({navigation, route}) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const {person, last_person} = useSelector(state => state.storyStore);

  let personData = [...person];

  const [data, setData] = useState({
    id: last_person + 1,
    category_id: id,
    name: '',
    balance: 0,
    number: '',
  });

  const AddPerson = async () => {
    if (data?.name?.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'নাম ভুল হয়েছে',
        text2: `সঠিক নাম ব্যবহার করুন`,
      });
    } else if (data?.number?.length != 11 || isNaN(data?.number)) {
      Toast.show({
        type: 'error',
        text1: 'নাম্বার ভুল হয়েছে',
        text2: `সঠিক নাম্বার ব্যবহার করুন`,
      });
    } else {
      personData.push(data);
      await LocalStorage.setLastPerson(last_person + 1);
      await LocalStorage.setPerson(personData);
      dispatch(loadPerson(personData));
      dispatch(loadLPI(last_person + 1));
      Toast.show({
        type: 'success',
        text1: 'যোগ করা হয়েছে',
        text2: `${data.name} কে যোগ করা হয়েছে`,
      });
      navigation.goBack();
    }
  };

  const placeholders = ['কাষ্টমারের', 'দোকানের', 'ব্যক্তির'];

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
            placeholder={placeholders[id - 1] + ' নাম'}
            style={styles.input}
            onChangeText={value => changeData(value, 'name')}
            value={data.name}
          />
          <TextInput
            placeholder="ফোন নাম্বার"
            style={styles.input}
            onChangeText={value => changeData(value, 'number')}
            value={data.number}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={AddPerson}>
          <Text style={styles.saveButton}>যোগ করুন</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AddPerson;
