/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, View, Platform, Image, Alert} from 'react-native';

import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Button, TextInput} from 'react-native-paper';
import {COLOR_PALETTE, FONTS} from '../../utils/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import * as permissions from 'react-native-permissions';
import services from '../../services/service';

const FileOrFolderSheet = props => {
  // useEffect(() => {}, []);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const _handleCapture = async () => {
    try {
      await permissions.request(
        Platform.OS === 'ios'
          ? permissions.PERMISSIONS.IOS.CAMERA
          : permissions.PERMISSIONS.ANDROID.CAMERA,
      );

      await ImagePicker.openCamera({
        includeBase64: true,
        mediaType: 'photo',
        loadingLabelText: 'Loading, Please Wait!',
      }).then(img => {
        setImage({
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
          data: img.data,
        });
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const _handleCameraRoll = async () => {
    try {
      await permissions.request(
        Platform.OS === 'ios'
          ? permissions.PERMISSIONS.IOS.MEDIA_LIBRARY
          : permissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      );

      ImagePicker.openPicker({
        includeBase64: true,
        cropperCircleOverlay: true,
        mediaType: 'photo',
        loadingLabelText: 'Loading, Please Wait!',
      }).then(img => {
        setImage({
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
          data: img.data,
        });
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const _handleSave = async () => {
    if (name === '') {
      Alert.alert('Please enter name', 'Files Require name');
      return;
    }
    try {
      setIsLoading(true);
      await services.createFile(
        name,
        false,
        `data:${image.mime};base64,${image.data}`,
        props.payload.parentId,
      );
      setIsLoading(false);
      await SheetManager.hide(props.sheetId, {
        payload: {
          success: true,
        },
      });
    } catch (error) {
      console.warn("Couldn't upload the File. Please Try again");
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
          label={'File Name'}
          onChangeText={setName}
          contentStyle={{width: '100%', backgroundColor: 'white'}}
          style={{width: '100%', marginBottom: 30}}
        />
        {image === null ? (
          <View>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={{height: 45}}
              labelStyle={styles.buttonLabel}
              textColor={COLOR_PALETTE.buttonTextColor}
              buttonColor={COLOR_PALETTE.buttonColor}
              onPress={_handleCapture}>
              Take photo
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={{height: 45}}
              labelStyle={styles.buttonLabel}
              textColor={COLOR_PALETTE.buttonTextColor}
              buttonColor={COLOR_PALETTE.buttonColor}
              onPress={_handleCameraRoll}>
              Add from Camera Roll
            </Button>
          </View>
        ) : (
          <View>
            <Image
              style={{width: 500, height: 500, resizeMode: 'contain'}}
              source={{uri: image.uri}}
            />
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={{height: 45, width: '100%'}}
              labelStyle={styles.buttonLabel}
              textColor={COLOR_PALETTE.buttonTextColor}
              buttonColor={COLOR_PALETTE.buttonColor}
              disabled={isLoading}
              onPress={_handleSave}>
              Upload
            </Button>
          </View>
        )}
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
