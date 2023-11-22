import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';

const imgURL = require('../../assets/job_icon.png');

const JobItem = ({item, index, onPress}) => {
  const styles = useStyles();
  const date = new Date(item.date);
  return (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => onPress(item, index)}>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={imgURL} />

        <View style={styles.subContainer}>
          <Text allowFontScaling={false} style={styles.jobName}>
            {item.ProjectLocation?.name}
          </Text>
          <View style={styles.infoTextContainer}>
            <Text allowFontScaling={false} style={styles.infoText}>
              {item.ProjectUsers.length + ' workers'}
            </Text>
            <Text allowFontScaling={false} style={styles.infoText}>
              {date.toLocaleDateString('en-us')}
            </Text>
          </View>
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
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
    },
    image: {
      width: 50,
      height: 50,
    },
    subContainer: {
      flex: 1,
      marginLeft: 16,
    },
    jobName: {
      fontSize: 16.5,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.medium,
    },
    infoTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 7,
    },
    infoText: {
      fontSize: 13,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.regular,
    },
  });
};

export default JobItem;
