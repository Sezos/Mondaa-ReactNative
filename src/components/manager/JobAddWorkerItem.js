import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, IconButton} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';

const JobAddWorkerItem = ({item, onPress}) => {
  const styles = useStyles();
  const zuragURL =
    'https://mondaa-test.s3.ap-east-1.amazonaws.com/' + item.avatar;

  const _handlePress = () => {
    item.selected = !item.selected;
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={_handlePress}>
      <View style={[styles.container]}>
        <Avatar.Image
          source={
            item.avatar ? {uri: zuragURL} : require('../../assets/avatar.png')
          }
          size={50}
        />
        <View style={styles.subContainer}>
          <Text allowFontScaling={false} style={styles.name}>
            {item.firstName + ' ' + item.lastName}
          </Text>

          <Text allowFontScaling={false} style={styles.text}>
            Code:{item.employeeId ? item.employeeId : '-'}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.text}>
          {item.role ? item.role : '-'}
        </Text>
        {item.selected ? (
          <Icon
            name="checkmark-circle"
            size={20}
            style={{marginLeft: 10}}
            color="green"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
      marginVertical: 5,
      backgroundColor: '#fff',
    },
    subContainer: {
      flex: 1,
      marginLeft: 10,
    },
    name: {
      fontSize: 16,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    text: {
      fontFamily: FONTS.regular,
      color: 'darkgray',
      fontSize: 13,
    },
    roleContainer: {
      backgroundColor: '#BDB9FF',
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    role: {
      fontSize: 10,
      color: '#fff',
    },
  });
};

export default JobAddWorkerItem;
