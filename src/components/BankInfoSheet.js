import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Button, TextInput} from 'react-native-paper';
import {COLOR_PALETTE} from '../utils/Constants';

const BankInfoSheet = props => {
  const styles = useStyles();
  const [value, setValue] = useState(props.payload);

  const _handleSave = async () => {
    await SheetManager.hide('BankInfoSheet', {payload: value});
  };

  return (
    <ActionSheet
      id={props.sheetId}
      useBottomSafeAreaPadding={true}
      closable={true}
      containerStyle={{paddingHorizontal: 15}}
      closeOnPressBack={false}>
      <View>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          textColor={COLOR_PALETTE.textColor}
          activeUnderlineColor={COLOR_PALETTE.primaryColor}
          returnKeyType="done"
          clearButtonMode="while-editing"
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={_handleSave}>
          Save
        </Button>
      </View>
    </ActionSheet>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    input: {
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,
      marginTop: 20,
      backgroundColor: '#fff',
      color: '#000',
    },
    button: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: COLOR_PALETTE.primaryColor,
      borderRadius: 10,
      marginVertical: 20,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 14,
    },
  });
};

export default BankInfoSheet;
