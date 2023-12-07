/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {
  Divider,
  TextInput,
  Avatar,
  Button,
  IconButton,
} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';

const EditGroupScreen = ({navigation, route}) => {
  const employees = route.params.users;
  const [name, setName] = useState(route.params.name);
  // const _handleSave = async () => {
  //   await SheetManager.hide(props.sheetId, {
  //     payload: name,
  //   });
  // };

  return (
    <View>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          size={18}
          onPress={() => navigation.goBack()}
        />
        <Text>Edit</Text>
        {/* <Button onPress={handleCreate}>+</Button> */}
      </View>
      <View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Avatar.Image size={150}></Avatar.Image>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 20}}>
            {name}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop: 20,
          }}>
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              height: '70%',
            }}>
            <FlatList
              data={employees
                .concat(employees)
                .concat(employees)
                .concat(employees)
                .concat(employees)
                .concat(employees)}
              renderItem={({item}) => {
                return (
                  <View>
                    <Text>{item.firstName}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginVertical: 40,
  },
  loadingText: {
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: FONTS.regular,
    marginTop: 10,
    color: COLOR_PALETTE.textColor,
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
  button: {
    width: '75%',
    borderRadius: 10,
    alignSelf: 'center',

    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
});

export default EditGroupScreen;
