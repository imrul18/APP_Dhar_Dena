import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import backgroundImage from './../assets/background.jpg';

import AntDesign from 'react-native-vector-icons/AntDesign';

import LocalStorage from '../component/LoaclStorage';
import {loadPerson} from '../redux/StoryStore';
import styles from '../style/styles';

const PersonList = ({navigation, route}) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const {person} = useSelector(state => state.storyStore);

  let personData = [...person];

  const data = person?.filter(item => item?.category_id == id);

  const deletePerson = async data => {
    if (data.balance != 0) {
      Toast.show({
        type: 'error',
        text1: 'মুছে ফেলা সম্ভব নয়',
        text2:
          data.balance < 0
            ? `আপনার কাছে এখনো ${-1 * data.balance} টাকা পাবে`
            : `আপনি এখনো ${data.balance} টাকা পাবেন`,
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'মুছে ফেলা হয়েছে',
        text2: `${data.name} এর সব তথ্য মুছে ফেলা হয়েছে`,
      });
      const res = personData.filter(item => item.id != data.id);
      await LocalStorage.setPerson(res);
      dispatch(loadPerson(res));
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.container}>
      <View style={{paddingVertical: 50}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.length < 1 && (
            <TouchableOpacity
              style={{
                ...styles.card,
                width: 300,
              }}
              onPress={() => navigation.navigate('AddPerson', {id: id})}>
              <View>
                <Text style={styles.cardtext}>
                  এখনো কাউকে যোগ করা হয়নি। যোগ করতে এখানে ক্লিক করুন
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {data?.map(item => {
            return (
              <TouchableOpacity
                key={item?.id}
                style={{
                  ...styles.card,
                  width: 300,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  navigation.navigate('TransactionList', {
                    id: item?.id,
                    type_id: id,
                  });
                }}>
                <View>
                  <Text style={styles.cardtext}>নাম : {item.name}</Text>
                  <Text style={styles.cardtext}>
                    টাকা
                    {item.balance < 0
                      ? ' পাবে : ' + -1 * item.balance
                      : ' পাবেন : ' + item.balance}{' '}
                    টাকা{' '}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    deletePerson(item);
                  }}>
                  <AntDesign name="delete" size={24} color="#f00" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPerson', {id: id})}>
        <AntDesign name="adduser" size={30} color="#000" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default PersonList;
