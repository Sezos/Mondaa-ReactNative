import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {ProviderContext} from '../../provider/Provider';

import FlipCard from '../../components/manager/FlipCard';
import JobList from '../../components/manager/JobList';
import services from '../../services/service';
import Header from '../../components/Header';
import {Button, IconButton} from 'react-native-paper';
import {COLOR_PALETTE} from '../../utils/Constants';
import {SheetManager} from 'react-native-actions-sheet';
import {useToast} from 'react-native-toast-notifications';

const ManagerHomeScreen = ({navigation}) => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();
  const toast = useToast();

  const [projectJSON, setProjectJSON] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider.selectedDate]);

  const _fetchData = async () => {
    setIsLoading(true);
    try {
      const {data} = await services.getProjectByDate({
        date: provider.selectedDate,
      });
      setProjectJSON(data);
    } catch (error) {
      console.log('Error fetching projects', error);
    } finally {
      setIsLoading(false);
    }
  };

  const _handlPress = data => {
    navigation.navigate('JobScreen', {
      data: data,
      date: provider.selectedDate.split('T')[0],
    });
  };

  const _addJob = async () => {
    const project = await SheetManager.show('AddJobSheet', {
      payload: {selectedProjects: projectJSON.map(p => p.ProjectLocation.id)},
    });
    if (project) {
      const date = new Date(provider.selectedDate);
      const {data, status} = await services.addProject({
        projectLocation: project.id,
        date: date,
        users: [],
      });
      if (status === 201) {
        _handlPress(data);
      } else {
        toast.show("Couldn't create a project", {type: 'warning'});
      }
    }
  };

  const _deleteJob = async (jobData, index) => {
    const {data, status} = await services.deleteProject(jobData.id);
    if (status === 200 && data.status === 'Deleted') {
      setProjectJSON(prevState => {
        prevState.splice(index, 1);
        return [...prevState];
      });
      toast.show('Successful', {type: 'success'});
    }
    // const
  };

  const _sendOffNoti = async () => {
    Alert.alert('Warning', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          await services.sendNotificationOff(provider.selectedDate);
        },
        style: 'default',
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={[StyleSheet.absoluteFill, {paddingHorizontal: 15}]}>
      <Header {...provider.userData} />
      <View style={styles.body}>
        <FlipCard />
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Text
            allowFontScaling={false}
            style={{marginVertical: 10, fontSize: 12}}>
            Total: {projectJSON.length}
          </Text>
          <Button
            style={{
              backgroundColor: COLOR_PALETTE.primaryColor,
              color: 'black',
            }}
            onPress={_sendOffNoti}>
            Send Off
          </Button>
        </View>
        <JobList
          data={projectJSON}
          isRefreshing={isLoading}
          fetchData={_fetchData}
          onDelete={_deleteJob}
          onPress={_handlPress}
        />
        <IconButton
          icon="plus"
          iconColor="#fff"
          containerColor={COLOR_PALETTE.primaryColor}
          style={styles.floatButton}
          onPress={_addJob}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    body: {flex: 1},
    floatButton: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 10,
      right: 0,
    },
  });
};

export default ManagerHomeScreen;
