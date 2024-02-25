import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, IconButton} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';

const ExistWorkerItem = ({item, onPress, onRemove}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Avatar.Image source={require('../../assets/avatar.png')} size={45} />
        <View style={styles.subContainer}>
          <Text allowFontScaling={false} style={styles.name}>
            {item.firstName + ' ' + item.lastName}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {item.role}
          </Text>
        </View>
        <IconButton
          icon="trash-can-outline"
          iconColor={COLOR_PALETTE.primaryColor}
          size={20}
          onPress={() => onRemove(item)}
        />
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
      paddingVertical: 10,
      paddingHorizontal: 15,
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

export default ExistWorkerItem;
