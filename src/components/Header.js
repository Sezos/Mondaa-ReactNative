import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {ProviderContext} from '../provider/Provider';
import CalendarSvg from '../assets/icons/Calendar';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';

const Header = props => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);
  const zuragURL =
    'https://scontent.fsyd12-1.fna.fbcdn.net/v/t39.30808-6/304834509_535131748616627_7084528645270394390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ekg7S1Z3-6UAX8tKlfi&_nc_ht=scontent.fsyd12-1.fna&oh=00_AfAlkOI1A2-s-dZFMKYHiRs1TW8V0pCytKWIDSQAAKD1MQ&oe=64ED8B55';

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <Avatar.Image
          source={{
            uri: props.avatar
              ? 'https://mondaa-test.s3.ap-east-1.amazonaws.com/' + props.avatar
              : zuragURL,
          }}
          size={60}
        />

        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontFamily: FONTS.regular,
              color: COLOR_PALETTE.textColor,
            }}>
            Hello,
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.headerName}>
            {` ${props.firstName} ${props.lastName}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => provider.setCalendarVisible(true)}>
        <View style={styles.calendarContainer}>
          <CalendarSvg />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    headerSubContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerName: {
      fontSize: 16,
      color: COLOR_PALETTE.textColor,
      fontFamily: FONTS.bold,
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

export default Header;
