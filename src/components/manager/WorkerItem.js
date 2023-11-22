import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';

const WorkerItem = ({item, index, isWorker}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const zuragURL =
    'https://mondaa-test.s3.ap-east-1.amazonaws.com/' + item.avatar;

  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (!isWorker) {
          navigation.navigate('WorkerInfoScreen', {
            data: item,
          });
        }
      }}>
      <View style={styles.container}>
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
          <View style={styles.textContainer}>
            <Icon name="call-outline" color="#6D6B7E" size={15} />
            <Text allowFontScaling={false} style={styles.text}>
              {item.phone}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Icon name="mail-outline" color="#6D6B7E" size={15} />
            <Text allowFontScaling={false} style={styles.text}>
              {item.email}
            </Text>
          </View>
        </View>
        <View style={styles.roleContainer}>
          <Text allowFontScaling={false} style={styles.role}>
            {item.role}
          </Text>
        </View>
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
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginVertical: 5,
    },
    subContainer: {
      flex: 1,
      marginLeft: 10,
    },
    name: {
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.semiBold,
      fontSize: 17,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    text: {
      fontFamily: FONTS.regular,
      fontSize: 13,
      color: COLOR_PALETTE.textColor,
      marginLeft: 7,
    },
    roleContainer: {
      backgroundColor: '#BDB9FF',
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    role: {
      fontFamily: FONTS.regular,
      fontSize: 11.5,
      color: '#fff',
    },
  });
};

export default WorkerItem;
