import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import WorkAddSvg from '../../assets/icons/WorkAdd';
import services from '../../services/service';
import JobItem from '../../components/manager/JobItem';
import EmptyList from '../../components/EmptyList';
import JobList from '../../components/manager/JobList';

const WorkScreen = ({navigation}) => {
  const styles = useStyles();

  const [workJSON, setWorkJSON] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    _fetchData();
  }, [navigation]);

  const _fetchData = async () => {
    setLoading(true);
    try {
      const {data} = await services.getAllProject();
      setWorkJSON(data);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const _addJob = () => {
    navigation.navigate('AddWorkScreen');
  };

  const _jobInfo = data => {
    navigation.navigate('JobScreen', {data: data});
  };

  return (
    <View style={[StyleSheet.absoluteFill, {paddingHorizontal: 15}]}>
      <View style={styles.headerContainer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text allowFontScaling={false} style={{fontSize: 24}}>
            Project
          </Text>
          <View style={styles.employeeCountContainer}>
            <Text
              allowFontScaling={false}
              style={styles.employeeCountText}></Text>
          </View>
        </View>
        <TouchableOpacity onPress={_addJob}>
          <View style={styles.addButton}>
            <WorkAddSvg />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Text
          allowFontScaling={false}
          style={{marginVertical: 10, fontSize: 12}}>
          Total: {workJSON.length}
        </Text>
        <JobList
          data={workJSON}
          isRefreshing={isLoading}
          onPress={_jobInfo}
          onRefresh={_fetchData}
        />
        {/* <FlatList
          data={workJSON}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <JobItem item={item} index={index} />}
          initialNumToRender={10}
          ListEmptyComponent={() => <EmptyList />}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={_fetchData} />
          }
        /> */}
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    addButton: {
      backgroundColor: '#fff',
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
  });
};

export default WorkScreen;
