import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Icon,
  Image,
} from 'react-native';

import ContextMenu from 'react-native-context-menu-view';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import {IconButton, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import services from '../services/service';
import {ProviderContext} from '../provider/Provider';
import {socket} from '../utils/socket';
import UserEmptyList from '../components/EmptyList2';
import {SheetManager} from 'react-native-actions-sheet';

const FileScreen = ({route, navigation}) => {
  const provider = useContext(ProviderContext);
  const [file, setFile] = useState({});
  const params = route.params;

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = async () => {
    const {data} = await services.getFile(params.id);
    setFile(data);
  };

  const downloadItem = async () => {};

  return (
    <View style={{height: '100%'}}>
      <View style={{marginBottom: 100}}>
        <Header
          navigation={navigation}
          name={file?.name}
          onPress={downloadItem}
        />
        <Image
          source={{
            uri: 'https://mondaa-test.s3.ap-east-1.amazonaws.com/' + file.url,
          }}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </View>
  );
};

const Header = ({navigation, name}) => {
  return (
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon="arrow-left"
            iconColor="#04092199"
            size={18}
            onPress={() => navigation.goBack()}
            // style={styles.backButton}
          />
          <Text>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ChatSection: {
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    rightSide: {display: 'flex', flexDirection: 'row'},
    lastChat: {
      color: 'gray',
    },
    date: {
      color: 'gray',
      paddingLeft: 10,
    },
    title: {
      paddingBottom: 10,
      fontSize: 20,
      fontFamily: FONTS.regular,
    },
    Body: {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftSide: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  header: {
    fontSize: 22,
    marginVertical: 10,
    fontFamily: FONTS.bold,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: COLOR_PALETTE.backgroundColor,
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
  forgotPassword: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    alignSelf: 'flex-end',
    color: '#2167D2',
  },
  button: {
    width: '75%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  infoLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  infoLabel: {
    fontSize: 11,
    marginHorizontal: 15,
    fontFamily: FONTS.regular,
  },
  divider: {
    width: '25%',
    backgroundColor: 'darkgray',
  },
});

export default FileScreen;
