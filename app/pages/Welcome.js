import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from '../style/styles';
import backgroundImage from './../assets/background.jpg';

import {useDispatch, useSelector} from 'react-redux';
import {loadData} from '../redux/StoryStore';

import WaitingModal from '../component/WaitingModal';
import LocalStorage from '../component/LoaclStorage';

const Welcome = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {category} = useSelector(state => state.storyStore);

  const setUp = async () => {
    const res = await LocalStorage.loadAllData();
    dispatch(loadData(res));
    setLoading(false);
  };

  useEffect(() => {
    setUp();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>আপনি একজন:</Text>
      </View>
      {category?.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={{...styles.card, alignItems: 'center'}}
            onPress={() => navigation.navigate('PersonList', {id: item?.id})}>
            <Text style={styles.cardtext}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
      <WaitingModal loading={loading} />
    </ImageBackground>
  );
};

export default Welcome;
