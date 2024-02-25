/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  Button,
  DataTable,
  Text,
  TextInput,
  Snackbar,
  Portal,
  Modal,
  Divider,
} from 'react-native-paper';

import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import DropDown from 'react-native-paper-dropdown';
import services from '../../services/service';
import {ScrollView} from 'react-native';

export default function CreateTimeSheet({navigation}) {
  //list of all employees because I wasn't able to get it from backend through projectWorkers LOL
  const [employees, setEmployees] = React.useState([]);

  //The workHour records that come from backend
  const [datas, setDatas] = React.useState([]);

  //Values I guess
  const [hours, setHours] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState(-1);
  const [selectedWorker, setSelectedWorker] = React.useState(null);

  //Lists that came through API
  const [locations, setLocations] = React.useState([]);
  const [workers, setWorkers] = React.useState([]);

  //Calendar shits
  const [markedDate, setMarkedDate] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [isCalendarShown, setIsCalendarShown] = React.useState(0);

  //dropdown isShow
  const [locationDropDown, setLocationDropDown] = React.useState(0);
  const [workerDropDown, setWorkerDropDown] = React.useState(0);

  //Error Message on the bottom
  const [message, setMessage] = React.useState();

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      _fetch();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedLocation !== -1) {
      _getWorkHours();
      _computeEmployees();
    }
  }, [selectedLocation]);

  const _getWorkHours = async () => {
    const {data} = await services.getWorkHours({
      query: {
        projectId: locations[selectedLocation].id,
      },
      selection: {
        id: true,
        User: true,
        hours: true,
      },
    });
    const lel = data.map(workHour => {
      return {
        id: workHour.id,
        user_id: workHour.User.id,
        hours: workHour.hours,
        name: workHour.User.firstName + ' ' + workHour.User.lastName,
      };
    });
    setDatas(lel);
  };

  const _computeEmployees = () => {
    let lel = locations[selectedLocation]?.workers;
    lel = lel.map((le, idx) => {
      const employee = employees.find(emplo => emplo.id === le.userId);
      return {
        label: employee?.firstName + ' ' + employee?.lastName,
        value: idx,
        id: employee?.id,
      };
    });
    setWorkers(lel);
  };

  const _fetch = async () => {
    try {
      const {data} = await services.getProjectByDate({date: selectedDate});
      const employeesRaw = await services.getEmployees();
      setEmployees(employeesRaw.data);
      let lel = data.map((dat, idx) => {
        return {
          label: dat.ProjectLocation?.location.split(',')[0],
          address: dat.ProjectLocation?.location,
          value: idx,
          id: dat.id,
          workers: dat.ProjectUsers,
        };
      });

      setLocations(lel);
      setSelectedLocation(-1);
      setDatas([]);
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedWorker(null);
      setHours('');
    }
  };

  const toggleCalendar = () => setIsCalendarShown(!isCalendarShown);

  const _handleChangeDate = dateString => {
    let markedObj = {};
    markedObj[dateString] = {selected: true, selectedColor: '#4355FA'};
    setMarkedDate({...markedObj});
  };

  const handleAdd = async () => {
    if (!hours) {
      setMessage('Please fill Hours field');
      return;
    }

    if (selectedWorker === null) {
      setMessage('Please fill Employee Code field');
      return;
    }
    if (
      datas.map(data => data.user_id).indexOf(workers[selectedWorker].id) !== -1
    ) {
      setMessage('This Employee has already been registered');
      return;
    }
    try {
      await services.createWorkHour({
        projectId: locations[selectedLocation].id,
        userId: workers[selectedWorker].id,
        hours: parseFloat(hours),
      });
      _getWorkHours();
    } catch (err) {
      console.error(err);
    }
  };
  const _handleRemove = async idx => {
    try {
      const {status} = await services.removeWorkHour(parseFloat(datas[idx].id));
      if (status === 200) {
        setDatas(datas.filter(item => item.id !== datas[idx].id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
          Timesheet
        </Text>
      </View>
      <View>
        <View style={{margin: 5}}>
          <Button
            style={{
              borderRadius: 5,
              borderBottomColor: COLOR_PALETTE.dividerColor,
              height: 50,
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}
            onPress={toggleCalendar}>
            {selectedDate === null ? 'Select Date' : selectedDate}
          </Button>
          <DropDown
            style={{
              borderRadius: 5,
              borderBottomColor: 'orange',
              height: 50,
              borderBottomWidth: 1,
              justifyContent: 'center',
            }}
            label={'Location'}
            visible={locationDropDown}
            showDropDown={() => {
              setLocationDropDown(true);
            }}
            onDismiss={() => setLocationDropDown(false)}
            value={selectedLocation}
            setValue={val => {
              setSelectedWorker(-1);
              setSelectedLocation(val);
            }}
            list={locations}
            inputProps={{
              style: styles.input,
            }}
          />
          <DropDown
            label={'Worker'}
            activeColor={'orange'}
            visible={workerDropDown}
            showDropDown={() => {
              workers.length === 0 || setWorkerDropDown(true);
            }}
            onDismiss={() => setWorkerDropDown(false)}
            value={selectedWorker}
            setValue={setSelectedWorker}
            list={workers}
            inputProps={{
              style: styles.input,
              disabled: workers.length === 0,
            }}
            dropDownItemSelectedStyle={{color: COLOR_PALETTE.primaryColor}}
            dropDownStyle={styles.input}
          />
          <View style={styles.inputContainer}>
            <TextInput
              label="Hours"
              value={hours}
              keyboardType="numeric"
              returnKeyLabel="Done"
              returnKeyType="done"
              onChangeText={text => setHours(text)}
              textColor={COLOR_PALETTE.textColor}
              placeholderTextColor="lightgray"
              activeUnderlineColor={COLOR_PALETTE.primaryColor}
              underlineColor="darkgray"
              style={styles.input}
            />
          </View>
        </View>

        <Button
          textColor="#fff"
          style={{
            backgroundColor: COLOR_PALETTE.primaryColor,
            width: '90%',
            alignSelf: 'center',
          }}
          onPress={() => handleAdd()}>
          Add
        </Button>
      </View>
      <DataTable style={{paddingBottom: 370}}>
        <DataTable.Header>
          <DataTable.Title>Code</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Hours</DataTable.Title>
          <DataTable.Title numeric>delete</DataTable.Title>
        </DataTable.Header>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 24}}
          style={{height: '100%'}}>
          {datas &&
            datas.length !== 0 &&
            datas.map((data, idx) => {
              return (
                <View key={idx}>
                  <DataTable.Row>
                    <DataTable.Cell>{data.user_id}</DataTable.Cell>
                    <DataTable.Cell>{data.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{data.hours}</DataTable.Cell>
                    <Button
                      style={styles.datatable_button}
                      icon="minus"
                      onPress={() => {
                        _handleRemove(idx);
                      }}
                    />
                  </DataTable.Row>
                  <Divider style={{color: COLOR_PALETTE.dividerColor}} />
                </View>
              );
            })}
        </ScrollView>
      </DataTable>

      <Portal>
        <Modal
          visible={isCalendarShown}
          onDismiss={toggleCalendar}
          contentContainerStyle={styles.ModalStyle}>
          <Calendar
            markedDates={markedDate}
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
            onPress={() => {
              setSelectedDate(Object.keys(markedDate)[0]);
              toggleCalendar();
            }}>
            Select
          </Button>
        </Modal>
      </Portal>
      <Snackbar
        visible={message}
        onDismiss={() => {
          setMessage(null);
        }}
        action={{
          label: 'close',
          onPress: () => {
            setMessage(null);
          },
        }}>
        {message}
      </Snackbar>
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
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: '24',
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
});
