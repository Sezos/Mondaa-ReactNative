import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {ProviderContext} from '../provider/Provider';
import ForgotSvg from '../assets/ForgotSvg';
import services from '../services/service';
import {useToast} from 'react-native-toast-notifications';

const ForgotPasswordScreen = ({navigation}) => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);
  const toast = useToast();

  const [value, setValue] = useState('');

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(value)) {
      return true;
    } else {
      toast.show('Please fill Email!', {type: 'danger', duration: 1000});
    }
  };

  const _handleForgot = async () => {
    const isMail = validateEmail();
    if (isMail) {
      const {data} = await services.forgotPassword({
        email: value,
      });
      if (data.success) {
        toast.show(data.message, {type: 'success', duration: 1000});
        setTimeout(() => {
          navigation.navigate('ResetPasswordScreen', {email: value});
        }, 1000);
      }
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <IconButton
        icon="close"
        iconColor="red"
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          width: '70%',
          height: 250,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}>
        <ForgotSvg />
      </View>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={22} color="#6D6B7E" />
          <TextInput
            value={value}
            onChangeText={setValue}
            mode="contained"
            placeholder="Email"
            style={styles.input}
            textColor={COLOR_PALETTE.textColor}
            activeUnderlineColor={COLOR_PALETTE.primaryColor}
            underlineColor="darkgray"
            placeholderTextColor="#6D6B7E"
            returnKeyType="next"
            textContentType="emailAddress"
          />
        </View>
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={{height: 45}}
          labelStyle={styles.buttonLabel}
          textColor={COLOR_PALETTE.buttonTextColor}
          buttonColor={COLOR_PALETTE.buttonColor}
          onPress={_handleForgot}>
          Continue
        </Button>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
      paddingHorizontal: 15,
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
    },
    buttonLabel: {
      fontSize: 13,
      fontFamily: FONTS.bold,
    },
  });
};

export default ForgotPasswordScreen;
