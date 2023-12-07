/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Button, Divider, TextInput, Avatar} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import services from '../../services/service';

const FileOrFolderSheet = props => {
  const [name, setName] = useState('');
  useEffect(() => {
    console.log('here?');
  }, []);
  const createFolder = async () => {
    const {data, status} = await services.createFile(
      name,
      true,
      undefined,
      props.payload.parentId,
    );
    if (status === 201) {
      await SheetManager.hide(props.sheetId, {
        payload: {
          success: true,
        },
      });
    }
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
      <View style={styles.Container}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{width: '90%'}}
          contentStyle={{
            backgroundColor: 'white',
          }}
        />
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={{height: 45}}
          labelStyle={styles.buttonLabel}
          textColor={COLOR_PALETTE.buttonTextColor}
          buttonColor={COLOR_PALETTE.buttonColor}
          onPress={createFolder}>
          Save
        </Button>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
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
    backgroundColor: COLOR_PALETTE.buttonColor,
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
});

export default FileOrFolderSheet;
