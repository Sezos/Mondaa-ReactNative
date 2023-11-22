import messaging from '@react-native-firebase/messaging';

import services from '../services/service';

export async function RequestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

export const GetFCMToken = async () => {
  try {
    const fcmtoken = await messaging().getToken({senderId: '868485591948'});
    await services.setFCMToken({token: fcmtoken.toString()});
  } catch (err) {
    console.log(err);
  }
};

export const NotificationListener = async () => {
  // Register background handler
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on forground state.....', remoteMessage);
  });
};
