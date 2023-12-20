import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

const androidCredentials = {
  clientId: 'com.mondaa',
  appId: '1:868485591948:android:5b5575f2b77121e3c1dca9',
  apiKey: 'AIzaSyDXmuUnOLceK9irB86W4c2-NFypol3cnBc',
  databaseURL: 'mondaaapp-3a0ef.firebaseapp.com',
  storageBucket: 'mondaaapp-3a0ef.appspot.com',
  projectId: 'mondaaapp-3a0ef',
};

const iosCredentials = {
  clientId: 'com.mondaagroup',
  appId: '1:868485591948:ios:9998b2f7da4bcf82c1dca9',
  apiKey: 'AIzaSyChwUhcZFIBTGtIPTlXKl9T8HgKbBPUpxU',
  storageBucket: 'mondaaapp-3a0ef.appspot.com',
  projectId: 'mondaaapp-3a0ef',
};

export async function initApp() {
  await firebase.initializeApp(
    Platform.OS === 'ios' ? iosCredentials : androidCredentials,
  );
}
