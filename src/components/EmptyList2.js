import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLOR_PALETTE} from '../utils/Constants';

const UserEmptyList = ({title}) => {
  return (
    <View style={{marginTop: '20%'}}>
      <Image
        source={require('../assets/job_empty.png')}
        resizeMode="contain"
        style={{width: '90%', alignSelf: 'center'}}
      />
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          color: COLOR_PALETTE.textColor,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default UserEmptyList;
