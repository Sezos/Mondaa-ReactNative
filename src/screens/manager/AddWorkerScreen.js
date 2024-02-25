import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';

const AddWorkerScreen = ({navigation}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <ScreenHeader title="Add Worker" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddWorkerScreen;
