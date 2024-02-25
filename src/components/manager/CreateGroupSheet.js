/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Button, Divider, TextInput, Avatar} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import {ProviderContext} from '../../provider/Provider';

const CreateGroupSheet = props => {
  const provider = useContext(ProviderContext);
  const employees = props.payload?.employees;
  const [name, setName] = useState('');
  const _handleSave = async () => {
    await SheetManager.hide(props.sheetId, {
      payload: name,
    });
  };

  return (
    <ActionSheet
      id={props.sheetId}
      useBottomSafeAreaPadding={true}
      closable={true}
      drawUnderStatusBar={true}
      containerStyle={{paddingHorizontal: 15}}
      headerAlwaysVisible={true}
      statusBarTranslucent={true}
      closeOnPressBack={false}>
      <View style={{height: '95%'}}>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={val => {
              setName(val);
            }}
            mode="contained"
            placeholder="Group Name"
            textColor={COLOR_PALETTE.textColor}
            placeholderTextColor="lightgray"
            activeUnderlineColor={COLOR_PALETTE.primaryColor}
            underlineColor="darkgray"
            returnKeyType="done"
            style={styles.input}
          />
        </View>
        <FlatList
          data={employees}
          renderItem={({item, index}) => {
            const zuragURL = provider.s3URL + item.avatar;

            return (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Avatar.Image
                  source={
                    item.avatar
                      ? {uri: zuragURL}
                      : require('../../assets/avatar.png')
                  }
                  size={50}
                  style={{marginRight: 10}}
                />
                <Text>{item.firstName + ' ' + item.lastName}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() =>
            employees.length > 0 && (
              <Divider style={{backgroundColor: COLOR_PALETTE.dividerColor}} />
            )
          }
        />
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={{height: 45}}
          labelStyle={styles.buttonLabel}
          textColor={COLOR_PALETTE.buttonTextColor}
          buttonColor={COLOR_PALETTE.buttonColor}
          onPress={_handleSave}>
          Save
        </Button>
      </View>
    </ActionSheet>
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

export default CreateGroupSheet;
