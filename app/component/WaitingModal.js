import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

const WaitingModal = ({loading}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={loading}>
      <View style={styles.loginModalView}>
        <ActivityIndicator size="large" color="red" />
        <Text>Please Wait...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
  },
});

export default WaitingModal;
