/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button, IconButton, DataTable} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PickerModal from 'react-native-picker-modal-view';
import services from '../../services/service';
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';

export default function ProjectLocation({navigation}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    try {
      let {data} = await services.getAllProjectLocation();
      setProjects(data);
    } catch (error) {
      console.log('error fetching job', error);
    } finally {
    }
  };

  const _deleteProject = async id => {
    try {
      let {data} = await services.deleteProjectLocation(id);
      console.log('deleted', data);
      _fetchData();
    } catch (error) {
      console.log('error fetching job', error);
    } finally {
    }
  };

  const handleCreate = () => {
    navigation.navigate('CreateProjectLocationScreen');
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
          <IconButton
            icon="arrow-left"
            iconColor="#04092199"
            size={18}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text>Create Project Location</Text>
          <Button onPress={handleCreate}>+</Button>
        </View>
      </View>
      <DataTable>
        <GestureHandlerRootView>
          <ScrollView style={{height: '100%'}}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: 75,
                // height: '100%',
              }}>
              {projects.map((project, idx) => {
                return (
                  <LocationRow
                    key={idx}
                    project={project}
                    onPress={() => {
                      _deleteProject(project.id);
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </DataTable>
    </View>
  );
}

const LocationRow = ({project, onPress}) => {
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        marginBottom: 5,
        marginTop: 5,
        display: 'flex',
        padding: 10,
      }}>
      <Text style={{fontWeight: 'bold'}}>{project.name}</Text>
      <Text>{project.location}</Text>

      <IconButton
        style={{position: 'absolute', right: 0}}
        icon="trash-can-outline"
        iconColor="red"
        size={18}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
