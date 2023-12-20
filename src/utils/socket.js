import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserToken = async () => {
  const token = await AsyncStorage.getItem('access_token');
  console.log(token);
  return token;
};

export const socket = io.connect('https://api.mondaa.com.au/events', {
  // export const socket = io.connect('http://localhost:3030/events', {
  auth: {
    token: getUserToken(),
  },
});
