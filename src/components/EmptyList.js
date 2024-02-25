import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLOR_PALETTE} from '../utils/Constants';

const EmptyList = () => {
  return (
    <View style={{marginTop: '20%'}}>
      <Text
        allowFontScaling={false}
        style={{
          fontSize: 20,
          color: COLOR_PALETTE.placeholderColor,
          textAlign: 'center',
        }}>
        Sorry, List is empty
      </Text>
    </View>
  );
};

export default EmptyList;
