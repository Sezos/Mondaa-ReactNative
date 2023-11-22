import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {IconButton, TextInput, Divider, Button} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import ScreenHeader from '../../components/ScreenHeader';
import services from '../../services/service';
import Icon from 'react-native-vector-icons/Ionicons';
import JobAddWorkerItem from '../../components/manager/JobAddWorkerItem';
import {SheetManager} from 'react-native-actions-sheet';
import {ProviderContext} from '../../provider/Provider';
import ExistWorkerItem from '../../components/manager/ExistWorkerItem';
import EmptyList from '../../components/EmptyList';
import AddressItem from '../../components/manager/AddressItem';
import {useToast} from 'react-native-toast-notifications';

const AddWorkScreen = ({navigation, route}) => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();
  let mapRef = useRef();
  const toast = useToast();

  const [employeeJSON, setEmployeeJSON] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    _fetchData();
  }, []);

  const _addWorker = async () => {
    await SheetManager.show('WorkerAddSheet');
  };

  const _removeWorker = data => {
    provider.setWorkerList(prevState =>
      prevState.filter(element => element.id !== data.id),
    );
  };

  const _fetchData = async () => {
    try {
      const {data, status} = await services.getEmployees();
      if (status === 200) {
        setEmployeeJSON(data);
      }
    } catch (error) {
      console.log('Error getting employees', error);
    }
  };

  const _goBack = () => {
    provider.setWorkerList([]);
    navigation.goBack();
  };
  const _handleSave = async () => {
    const ids = provider.workerList.map(item => item.id);

    const location = mapRef.current?.getAddressText();
    if (ids.length === 0) {
      toast.show('Please Choose a Worker!', {type: 'warning'});
      return;
    }
    if (location.length === 0) {
      toast.show('Please Choose a location!', {type: 'warning'});
      return;
    }
    const date = new Date(provider.selectedDate);
    const {data, status} = await services.addProject({
      name: location,
      date: date,
      stateId: 1,
      users: ids,
    });
    if (status === 201) {
      toast.show('Successful!', {type: 'success'});
      navigation.goBack();
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScreenHeader
        title="Create Job"
        calendarVisible={true}
        onPress={() => _goBack()}
      />
      <View style={styles.body}>
        <GooglePlacesAutocomplete
          ref={mapRef}
          enablePoweredByContainer={false}
          query={{
            key: 'AIzaSyDwJqeJOqAJYPkW1YcNz46hOI5fZ4CCxeg',
            language: 'en',
            components: 'country:aus',
          }}
          styles={{
            container: {
              flex: 0,
            },
          }}
          textInputProps={{
            InputComp: TextInput,
            mode: 'flat',
            placeholder: 'Enter Address!',
            style: styles.input,
            textColor: COLOR_PALETTE.textColor,
            underlineColor: 'darkgray',
            activeUnderlineColor: COLOR_PALETTE.primaryColor,
            placeholderTextColor: COLOR_PALETTE.placeholderColor,
          }}
        />

        <View style={styles.labelContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            Workers
          </Text>
          <Text allowFontScaling={false} style={styles.label}>
            {provider.selectedDate}
          </Text>
        </View>

        <FlatList
          data={provider.workerList}
          style={{flex: 1}}
          renderItem={({item}) => (
            <ExistWorkerItem item={item} onRemove={_removeWorker} />
          )}
          ListEmptyComponent={() => <EmptyList />}
        />

        <IconButton
          icon="account-plus-outline"
          iconColor="#fff"
          containerColor={COLOR_PALETTE.primaryColor}
          style={styles.floatButton}
          onPress={_addWorker}
        />
        <IconButton
          icon="check"
          iconColor="#fff"
          containerColor="#3DB787"
          style={styles.addButton}
          onPress={_handleSave}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
      paddingHorizontal: 15,
    },
    input: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      fontSize: 14,
      fontFamily: FONTS.regular,
    },
    floatButton: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    addButton: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 20,
      right: 20,
      marginRight: 75,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    label: {
      fontFamily: FONTS.semiBold,
      fontSize: 14,
      color: COLOR_PALETTE.textColor,
    },
  });
};

export default AddWorkScreen;
