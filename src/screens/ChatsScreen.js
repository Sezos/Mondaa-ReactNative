import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const ChatsScreen = ({}) => {
  return (
    <View>
      <ChatHeader />
      <View>
        <GestureHandlerRootView>
          <ScrollView
            style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
            <View>
              <ChatSection
                id={1}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={2}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={3}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={4}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={5}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={6}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={7}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={8}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
              <ChatSection
                id={9}
                title={'title'}
                body={'body'}
                lastChat={'lastChat'}
                date={'date'}
                status={1}
                imgURL={require('../assets/job_icon.png')}
              />
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const ChatHeader = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      }}>
      <Text style={{fontFamily: FONTS.bold, fontSize: 20}}>Chat</Text>
    </View>
  );
};

const ChatSection = ({id, title, lastChat, date, imgURL, status}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ChatScreen', {id, title, imgURL});
      }}>
      <View style={styles.ChatSection.Body}>
        <View style={styles.ChatSection.leftSide}>
          <View>
            <Image
              style={styles.ChatSection.image}
              resizeMode="contain"
              source={imgURL}
            />
          </View>
          <View>
            <Text style={styles.ChatSection.title}>{title}</Text>
            <Text style={styles.ChatSection.lastChat}>{lastChat}</Text>
          </View>
        </View>
        <View style={styles.ChatSection.rightSide}>
          <Text style={styles.ChatSection.status}>{status}</Text>
          <Text style={styles.ChatSection.date}>{date}</Text>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
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

export default ChatsScreen;
