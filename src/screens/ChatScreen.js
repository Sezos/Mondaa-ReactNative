import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {IconButton, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {subscribeToMessages} from './messageService';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const params = route.params;

  return (
    <View style={{height: '100%'}}>
      <ChatHeader name={params.title} />
      <View style={{height: '100%'}}>
        <GestureHandlerRootView>
          <ScrollView
            style={{width: '100%', height: '95%', backgroundColor: 'white'}}>
            <View>
              <Text>{params.id}</Text>
              <Text>lmao</Text>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </View>
      <ChatInput />
    </View>
  );
};

const ChatHeader = ({name}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      }}>
      <IconButton
        style={{display: 'flex', position: 'absolute', left: 0}}
        icon={'arrow-left'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={{fontFamily: FONTS.bold, fontSize: 20}}>{name}</Text>
    </View>
  );
};

const ChatInput = ({value, setValue}) => {
  return (
    <View
      style={{
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        width: '100%',
        height: 75,
        paddingLeft: 20,
        paddingBottom: 30,
        flexDirection: 'row',
      }}>
      <IconButton icon="file-document-outline" />
      <TextInput
        style={{width: '70%', backgroundColor: 'transparent'}}
        value={value}
        onChange={setValue}
      />
      <IconButton icon="send-circle-outline" />
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

export default ChatScreen;
