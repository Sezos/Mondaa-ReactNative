/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect, useState} from 'react';
import services from '../services/service';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {
  NotificationListener,
  RequestUserPermission,
} from '../utils/notification';
const ProviderContext = createContext();

// import PushNotification from 'react-native-push-notification';

const Provider = props => {
  const [avatar, setAvatar] = useState('');
  const [userData, setUserData] = useState({});
  const [workerList, setWorkerList] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    if (isLoggedIn) {
      RequestUserPermission();
      _getUserData();
      _countProjectUsers();
      _countEmployees();
    }
  }, [isLoggedIn]);

  //total employees: count
  const _countEmployees = async () => {
    const {data} = await services.countEmployees();
    setEmployeeCount(data);
  };

  //Get Employee Data
  const _getUserData = async () => {
    const {data} = await services.getUserInfo();
    setAvatar(data?.avatar);
    setUserData(data);
  };

  //employees who has job today: count
  const _countProjectUsers = async () => {
    const {data} = await services.countProjectUsers({
      from: selectedDate,
      to: selectedDate,
    });
    setWorkerCount(data);
  };

  return (
    <ProviderContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        calendarVisible,
        setCalendarVisible,
        selectedDate,
        setSelectedDate,
        employeeCount,
        _countProjectUsers,
        setEmployeeCount,
        workerCount,
        setWorkerCount,
        workerList,
        setWorkerList,
        avatar,
        setAvatar,
      }}>
      {props.children}
    </ProviderContext.Provider>
  );
};

export {Provider, ProviderContext};
