import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {ProviderContext} from '../provider/Provider';
import CalendarSvg from '../assets/icons/Calendar';

const ScreenHeader = ({title, onPress, calendarVisible}) => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          size={18}
          onPress={onPress}
          style={styles.button}
        />
        <Text allowFontScaling={false} style={styles.title}>
          {title}
        </Text>
      </View>
      {calendarVisible ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => provider.setCalendarVisible(true)}>
          <View style={styles.calendarContainer}>
            <CalendarSvg />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    subContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    button: {
      height: 30,
      width: 35,
      backgroundColor: '#0409210A',
      borderRadius: 10,
    },
    title: {
      fontSize: 15,
      marginLeft: 10,
      fontFamily: FONTS.regular,
      color: COLOR_PALETTE.textColor,
    },
    calendarContainer: {
      width: 42,
      height: 42,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
  });
};

export default ScreenHeader;
