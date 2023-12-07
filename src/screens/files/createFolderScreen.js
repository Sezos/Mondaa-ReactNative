import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Icon,
} from 'react-native';

import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {IconButton, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import services from '../../services/service';
import {ProviderContext} from '../../provider/Provider';
import {socket} from '../../utils/socket';
import UserEmptyList from '../../components/EmptyList2';
import {SheetManager} from 'react-native-actions-sheet';
import Header from '../Header';

const FilesScreen = ({route, navigation}) => {
  const provider = useContext(ProviderContext);
  const [files, setFiles] = useState([]);
  const params = route.params;

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetch = async () => {
    console.log(params);
    const {data} =
      params && params.id
        ? await services.getFiles(params.id)
        : await services.getFiles();
    setFiles(data);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Button
          icon="folder"
          onPress={() => {
            navigation.push('FilesScreen', {id: item.id});
          }}
          style={{
            backgroundColor: 'white',
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          {item.name}
        </Button>
      </View>
    );
  };

  const create = () => {
    console.log('create');
  };

  return (
    <View style={{height: '100%'}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <View style={{marginBottom: 100}}>
          <Header
            navigation={navigation}
            name={'Files'}
            iconButton={{name: 'plus', onPress: create}}
          />
          <FlatList
            style={{height: '100%', margin: 20}}
            data={files}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <UserEmptyList title="Sorry, It's empty!" />
            )}
          />
        </View>
      </KeyboardAvoidingView>
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

export default FilesScreen;
