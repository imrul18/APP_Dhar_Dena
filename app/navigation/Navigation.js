import React from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdmobComponent from '../component/AdmobComponent';

import Welcome from '../pages/Welcome';
import PersonList from '../pages/PersonList';
import AddPerson from '../pages/AddPerson';
import TransactionList from '../pages/TransactionList';
import AddTransaction from '../pages/AddTransaction';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Welcome} />

          <Stack.Screen name="PersonList" component={PersonList} />
          <Stack.Screen name="AddPerson" component={AddPerson} />

          <Stack.Screen name="TransactionList" component={TransactionList} />
          <Stack.Screen name="AddTransaction" component={AddTransaction} />
        </Stack.Navigator>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}>
          <AdmobComponent />
        </View>
      </View>
      <Toast />
    </NavigationContainer>
  );
};
