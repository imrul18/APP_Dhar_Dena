import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import backgroundImage from './../assets/background.jpg';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from '../style/styles';
import moment from 'moment';

const TransactionList = ({navigation, route}) => {
  const id = route.params.id;
  const type_id = route.params.type_id;
  const {person, transaction} = useSelector(state => state.storyStore);

  const placeholder1 = ['টাকা নিয়েছেন', 'বাকি নিয়েছেন', 'ধার নিয়েছেন'];
  const placeholder2 = ['বাকি দিয়েছেন', 'টাকা দিয়েছেন', 'ধার দিয়েছেন'];

  const personData = person?.find(item => item?.id == id);
  const transactionData = transaction?.filter(item => item?.person_id == id);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.container}>
      <View style={{paddingVertical: 50}}>
        <TouchableOpacity
          style={{
            ...styles.card,
            width: 300,
          }}
          onPress={() => Linking.openURL(`tel: ${personData?.number}`)}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={24}
                color="#000"
                style={{paddingHorizontal: 10}}
              />
              <Text style={styles.cardtext}>{personData?.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="phone"
                size={24}
                color="#000"
                style={{paddingHorizontal: 10}}
              />
              <Text style={styles.cardtext}>{personData?.number}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="account-balance"
                size={24}
                color="#000"
                style={{paddingHorizontal: 10}}
              />
              <Text
                style={
                  personData?.balance < 0
                    ? {...styles.cardtext, color: '#F00'}
                    : styles.cardtext
                }>
                {personData?.balance} টাকা
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            ...styles.card,
            width: 300,
          }}>
          {transactionData?.map(item => {
            return (
              <View key={item?.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: 5,
                  }}>
                  <Text>
                    {moment(new Date(item?.date)).format('hh:mm A DD-MMM-YYYY')}
                  </Text>
                  <Text
                    key={item?.id}
                    style={item?.amount < 0 && {color: '#f00'}}>
                    {item?.amount}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginBottom: 5,
                  }}>
                  <Text>{item?.details}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{...styles.card, width: 120}}
            onPress={() =>
              navigation.navigate('AddTransaction', {id: id, type: false})
            }>
            <Text>{placeholder1[type_id - 1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.card, width: 120}}
            onPress={() =>
              navigation.navigate('AddTransaction', {id: id, type: true})
            }>
            <Text>{placeholder2[type_id - 1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TransactionList;
