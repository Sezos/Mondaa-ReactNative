/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Button, DataTable, IconButton, Modal, Portal} from 'react-native-paper';
import services from '../../services/service';
import {Calendar} from 'react-native-calendars';
import {COLOR_PALETTE} from '../../utils/Constants';
import {ProviderContext} from '../../provider/Provider';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function ManagerTimesheet({navigation}) {
  //date datas
  const provider = useContext(ProviderContext);

  const [from, setFrom] = useState(new Date().toISOString().split('T')[0]);
  const [to, setTo] = useState(new Date().toISOString().split('T')[0]);

  //Boolean to show if calendar is shown

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  //Marked date on Calendar
  const [fromMarkedDate, setFromMarkedDate] = useState({});
  const [toMarkedDate, setToMarkedDate] = useState({});

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    _handleChangeDate(new Date().toISOString().split('T')[0], '');
  }, []);

  useEffect(() => {
    _fetch();
  }, [from, to]);

  async function _fetch() {
    const {data} = await services.getWorkHoursTotalEmployee(
      from,
      to,
      provider.userData.id,
    );
    // console.log('data: ', data);
    setDatas(data);
  }

  const _download = async () => {
    const {data} = await services.downloadWorkHours(
      from,
      to,
      provider.userData.id,
    );
    Linking.openURL(data.response);
  };

  const toggleCalendar = calendar => {
    if (calendar === 'from') {
      setShowFrom(!showFrom);
    } else {
      setShowTo(!showTo);
    }
  };

  const _handleChangeDate = (dateString, which) => {
    let markedObj = {};

    markedObj[dateString] = {selected: true, selectedColor: '#4355FA'};

    if (which === 'from') {
      setFromMarkedDate(markedObj);
    } else if (which === 'to') {
      setToMarkedDate(markedObj);
    } else {
      setFromMarkedDate(markedObj);
      setToMarkedDate(markedObj);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <IconButton
              icon="arrow-left"
              iconColor="#04092199"
              size={18}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
            <Text>Timesheet</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <IconButton icon="download" onPress={_download}>
              Download
            </IconButton>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Button
            style={{
              backgroundColor: 'rgb(227,220,232)',
              borderRadius: 5,
              borderBottomColor: 'black',
              height: 50,
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}
            onPress={() => {
              toggleCalendar('from');
            }}>
            {from === null ? 'Select Date' : from}
          </Button>
          <Button
            style={{
              backgroundColor: 'rgb(227,220,232)',
              borderRadius: 5,
              borderBottomColor: 'black',
              height: 50,
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}
            onPress={() => {
              toggleCalendar('to');
            }}>
            {to === null ? 'Select Date' : to}
          </Button>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Location</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Hours</DataTable.Title>
            <DataTable.Title numeric>Salary</DataTable.Title>
          </DataTable.Header>

          <GestureHandlerRootView>
            <ScrollView style={{height: '84%'}}>
              {datas?.map((data, idx) => {
                return (
                  <DataTable.Row key={idx}>
                    <DataTable.Cell>
                      {data.Project.ProjectLocation.name}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {data.Project.date.split('T')[0].split('-')[1] +
                        '-' +
                        data.Project.date.split('T')[0].split('-')[2]}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{data.hours}</DataTable.Cell>
                    <DataTable.Cell numeric>${data.salary}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </GestureHandlerRootView>
        </DataTable>
      </View>
      <Portal>
        <Modal
          visible={showFrom}
          onDismiss={() => {
            toggleCalendar('from');
          }}
          contentContainerStyle={styles.ModalStyle}>
          <Calendar
            markedDates={fromMarkedDate}
            style={{
              height: 300,
              marginHorizontal: 10,
              borderRadius: 20,
            }}
            onDayPress={day => {
              _handleChangeDate(day.dateString, 'from');
            }}
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
            onPress={() => {
              setFrom(Object.keys(fromMarkedDate)[0]);
              toggleCalendar('from');
            }}>
            Select
          </Button>
        </Modal>
        <Modal
          visible={showTo}
          onDismiss={() => {
            toggleCalendar('to');
          }}
          contentContainerStyle={styles.ModalStyle}>
          <Calendar
            markedDates={toMarkedDate}
            style={{
              height: 300,
              marginHorizontal: 10,
              borderRadius: 20,
            }}
            onDayPress={day => {
              _handleChangeDate(day.dateString, 'to');
            }}
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
            onPress={() => {
              setTo(Object.keys(toMarkedDate)[0]);
              toggleCalendar('to');
            }}>
            Select
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalStyle: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    display: 'flex',
    alignSelf: 'center',
  },
  datatable_button: {
    flex: 1,
    marginTop: 7,
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '95%',
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
});
