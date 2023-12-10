/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import {Avatar, Button, IconButton, Text} from 'react-native-paper';
import WorkerScreen from './WorkerScreen';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {ProviderContext} from '../../provider/Provider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import services from '../../services/service';
import {useToast} from 'react-native-toast-notifications';
const zuragURL =
  'https://scontent.fsyd12-1.fna.fbcdn.net/v/t39.30808-6/304834509_535131748616627_7084528645270394390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ekg7S1Z3-6UAX8tKlfi&_nc_ht=scontent.fsyd12-1.fna&oh=00_AfAlkOI1A2-s-dZFMKYHiRs1TW8V0pCytKWIDSQAAKD1MQ&oe=64ED8B55';

const RenderContent = ({item, index, onPress}) => {
  return (
    <View>
      <Button
        style={styles.container}
        key={index.toString()}
        onPress={() => {
          onPress(item.componentName);
        }}>
        <View style={styles.subContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.jobName, {textColor: 'black'}]}>
            {item.description}
          </Text>
          <IconButton
            icon="arrow-right"
            iconColor="black"
            size={18}
            style={styles.backButton}
          />
        </View>
        {/* <Image style={styles.image} resizeMode="contain" source={imgURL} /> */}
      </Button>
    </View>
  );
};

const ManagerConterManager = ({navigation}) => {
  const provider = useContext(ProviderContext);
  const toast = useToast();
  const items = [
    {
      name: 'create_location',
      description: 'Project Locations',
      componentName: 'ProjectLocationScreen',
    },
    {
      name: 'Timesheet',
      description: 'Timesheet',
      componentName: 'TimesheetScreen',
    },
    {
      name: 'Employees',
      description: 'Employees',
      componentName: 'WorkerScreen',
    },
    {
      name: 'Send Notification',
      description: 'Send Notification',
      componentName: 'SendNotification',
    },
    {
      name: 'Files',
      description: 'Files',
      componentName: 'FilesScreen',
    },
  ];

  const onPress = screenName => {
    if (screenName === 'Files') {
      navigation.navigate(screenName, {
        id: 1,
      });
    } else navigation.navigate(screenName);
  };

  const _profileSelect = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',

        loadingLabelText: 'Loading, Please Wait!',
      });

      const {data} = await services.setAvatar({
        image: `data:${result.mime};base64,${result.data}`,
      });
      if (data.success) {
        provider.setAvatar(`data:${result.mime};base64,${result.data}`);
        toast.show('Picture is changed successfully', {type: 'success'});
      }
    } catch (error) {
      // console.error('Error changing profile', error);
    }
  };
  const _handleLogout = () => {
    Alert.alert('Warning', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: () => {
          provider.setIsLoggedIn(false);
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
    <View style={StyleSheet.absoluteFill}>
      <GestureHandlerRootView>
        <TouchableOpacity onPress={_profileSelect}>
          <Avatar.Image
            source={{
              uri: provider.avatar || zuragURL,
            }}
            size={150}
            style={{alignSelf: 'center', marginTop: 30}}
          />
        </TouchableOpacity>
      </GestureHandlerRootView>

      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            width: '100%',
          }}>
          <Text variant="titleLarge">Content Manager</Text>
        </View>
      </View>
      <View style={styles.body}>
        {items.map((item, idx) => {
          return (
            <RenderContent
              key={idx}
              item={item}
              index={idx}
              onPress={onPress}
              style={styles.item}
            />
          );
        })}
      </View>
      <View style={styles.itemContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity onPress={_handleLogout}>
            <View style={styles.item}>
              <Text allowFontScaling={false}>Log out</Text>
              <Icon name="chevron-right" size={18} />
            </View>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  subContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 16,
  },
  jobName: {
    fontSize: 16.5,
    alignSelf: 'center',
    color: COLOR_PALETTE.textColor,
    fontFamily: FONTS.medium,
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 7,
  },
  infoText: {
    fontSize: 13,
    color: COLOR_PALETTE.textColor,
    fontFamily: FONTS.regular,
  },
  floatButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  content: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'black',
  },
  body: {
    paddingHorizontal: 15,
    flex: 1,
  },
});

export default ManagerConterManager;
