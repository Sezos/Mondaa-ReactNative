import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button, Appbar, IconButton} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PickerModal from 'react-native-picker-modal-view';
import services from '../../services/service';

export default function CreateLocation({navigation}) {
  const [name, setName] = React.useState('');

  const [formanId, setFormanId] = React.useState(-1);
  const [address, setAddress] = React.useState('');

  const [employees, setEmployees] = React.useState([]);

  useEffect(() => {
    _fetchData();
  }, []);

  const findEmployeeByFormanId = id => {
    const res = employees.find(employee => {
      return employee.id === id;
    });
    return res;
  };

  const _fetchData = async () => {
    try {
      let {data} = await services.getAllUser();
      data = data.filter(employee => employee.role === 'Leader');
      data = data.map((employee, idx) => {
        employee.Name = employee.firstName + employee.lastName;
        employee.value = idx;
        return employee;
      });
      setEmployees(data);
    } catch (error) {
      console.log('error fetching job', error);
    } finally {
    }
  };

  const handleFinish = async () => {
    let response = await services.addProjectLocation({
      name,
      formanId,
      address,
    });
    console.log(response);
    navigation.goBack();
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
            height: '100%',
          }}>
          <IconButton
            icon="arrow-left"
            iconColor="#04092199"
            size={18}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text>Create Project Location</Text>
          <Button onPress={handleFinish}>Done</Button>
        </View>
      </View>
      <PickerModal
        renderSelectView={(disabled, selected, showModal) => (
          <Button disabled={disabled} onPress={showModal}>
            {formanId === -1
              ? 'Select Forman'
              : 'Forman: ' + findEmployeeByFormanId(formanId).Name}
          </Button>
        )}
        onSelected={it => {
          setFormanId(it.id);
        }}
        items={employees}
        // sortingLanguage={'tr'}
        showToTopButton={true}
        selected={findEmployeeByFormanId(formanId)}
        showAlphabeticalIndex={true}
        // autoGenerateAlphabeticalIndex={true}
        selectPlaceholderText={'Choose one...'}
        onEndReached={() => console.log('list ended...')}
        searchPlaceholderText={'Search...'}
        requireSelection={false}
        autoSort={false}
      />

      <TextInput
        label="Project Name"
        value={name}
        onChangeText={text => setName(text)}
        style={{backgroundColor: 'white'}}
      />

      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          setAddress(data.description);
        }}
        query={{
          key: 'AIzaSyAedG3JXI5i_r51I9Mydkb5SwRiQkOuiAo',
          language: 'en',
          // components: 'country:au',
        }}
        textInputProps={{
          InputComp: TextInput,
          onChangeText: text => {
            setAddress(text);
          },
          value: address,
          label: 'Address:',
          errorStyle: {color: 'red'},
        }}
      />
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyAedG3JXI5i_r51I9Mydkb5SwRiQkOuiAo',
          language: 'en',
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
