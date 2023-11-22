import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Calendar,
  LocaleConfig,
  CalendarContext,
  CalendarProvider,
} from 'react-native-calendars';
import {ProviderContext} from '../provider/Provider';
import {Button, Modal, Text} from 'react-native-paper';
import {COLOR_PALETTE} from '../utils/Constants';
import moment from 'moment';

LocaleConfig.locales['mn'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'mn';

const CustomCalendar = () => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);
  const [markedDate, setMarkedDate] = useState({});
  const context = useContext(CalendarContext);
  useEffect(() => {
    _handleChangeDate(provider.selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleChangeDate = dateString => {
    let markedObj = {};
    markedObj[dateString] = {selected: true, selectedColor: '#4355FA'};
    setMarkedDate({...markedObj});
  };

  const _handleClose = () => {
    provider.setSelectedDate(Object.keys(markedDate)[0]);
    provider.setCalendarVisible(false);
  };

  return (
    <Modal
      visible={true}
      dismissable={true}
      onDismiss={() => provider.setCalendarVisible(false)}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <Calendar
          markedDates={markedDate}
          context={{date: ''}}
          style={{
            height: 300,
            marginHorizontal: 10,
            borderRadius: 20,
          }}
          onDayPress={day => _handleChangeDate(day.dateString)}
          monthFormat="MMM yyyy"
          hideExtraDays={true}
          firstDay={0}
          enableSwipeMonths={false}
        />
        <Button
          mode="contained"
          style={{
            marginVertical: 20,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
          }}
          buttonColor={COLOR_PALETTE.primaryColor}
          textColor="#fff"
          onPress={_handleClose}>
          Select
        </Button>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default CustomCalendar;
