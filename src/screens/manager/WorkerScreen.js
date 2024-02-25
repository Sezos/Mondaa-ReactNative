import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import services from '../../services/service';
import WorkerItem from '../../components/manager/WorkerItem';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import UserAdd from '../../assets/icons/UserAdd';
import UserEmptyList from '../../components/EmptyList2';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';

const WorkerScreen = ({navigation}) => {
  const styles = useStyles();
  const [allJSON, setAllJSON] = useState([]);
  const [employeeJSON, setEmployeeJSON] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    setLoading(true);
    try {
      const {data, status} = await services.getEmployees();
      if (status === 200) {
        setAllJSON(data);
        setEmployeeJSON(data);
      }
    } catch (error) {
      console.error('Error getting employees', error);
    } finally {
      setLoading(false);
    }
  };

  const _handleSearch = value => {
    setSearchValue(value);
    let result = [];
    if (value.length >= 1) {
      result = allJSON.filter(element => {
        if (element.firstName.toLowerCase().includes(value.toLowerCase())) {
          return element;
        }
      });
      if (result.length === 0) {
        setEmployeeJSON([]);
      } else setEmployeeJSON(result);
    } else if (value.length === 0) {
      setEmployeeJSON(allJSON);
    }
  };

  return (
    <View style={[StyleSheet.absoluteFill]}>
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
          <View></View>
          <Text allowFontScaling={false} style={{fontSize: 24}}>
            Workers
          </Text>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
      <View style={{paddingHorizontal: 15, paddingBottom: 150}}>
        <View style={styles.headerContainer}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {/* <View style={styles.employeeCountContainer}>
            <Text allowFontScaling={false} style={styles.employeeCountText}>
              {employeeJSON.length}
            </Text>
          </View> */}
          </View>
          {/* <TouchableOpacity
          onPress={() => navigation.navigate('AddWorkerScreen')}>
          <View style={styles.employeeAddButton}>
            <UserAdd />
          </View>
        </TouchableOpacity> */}
        </View>
        <View style={styles.inputContainer}>
          <Icon name="search" size={22} color="#6D6B7E" />
          <TextInput
            value={searchValue}
            onChangeText={_handleSearch}
            mode="contained"
            placeholder="Search employee"
            textColor={COLOR_PALETTE.textColor}
            placeholderTextColor="lightgray"
            activeUnderlineColor={COLOR_PALETTE.primaryColor}
            underlineColor="darkgray"
            returnKeyType="done"
            style={styles.input}
          />
        </View>
        <Text
          allowFontScaling={false}
          style={{
            marginVertical: 10,
            fontSize: 12,
            fontFamily: FONTS.regular,
            color: COLOR_PALETTE.textColor,
          }}>
          Total: {employeeJSON.length}
        </Text>
        <FlatList
          data={employeeJSON}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          renderItem={({item, index}) => (
            <WorkerItem item={item} index={index} refresh={_fetchData} />
          )}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: COLOR_PALETTE.dividerColor}} />
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={_fetchData} />
          }
          ListEmptyComponent={() => (
            <UserEmptyList title="Sorry, It's empty!" />
          )}
        />
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
    employeeCountContainer: {
      width: 20,
      height: 20,
      backgroundColor: '#BDB9FF80',
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 6,
    },
    employeeCountText: {
      color: '#5F33E1',
      fontSize: 10,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    input: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginVertical: 10,
      fontSize: 14,
      fontFamily: FONTS.regular,
    },
    employeeAddButton: {
      backgroundColor: '#fff',
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
  });
};

export default WorkerScreen;
