import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import {Button, TextInput} from 'react-native-paper';
import services from '../services/service';
import {useToast} from 'react-native-toast-notifications';
import {ProviderContext} from '../provider/Provider';

global.Buffer = global.Buffer || require('buffer').Buffer;

function ResetPasswordScreen({navigation, route}) {
  const provider = useContext(ProviderContext);
  const styles = useStyles();
  const toast = useToast();
  const [checked, setChecked] = useState(0);
  const [pass, setPass] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const _resetPassword = async () => {
    try {
      setIsLoading1(true);
      const checkData = route.params;

      const lel = await services.resetPassword({
        ...checkData,
        password: pass,
      });

      if (!lel?.data?.success) {
        return toast.show(data.message, {type: 'danger', duration: 1000});
      }
      const {data} = await services.login({
        ...checkData,
        password: pass,
      });

      if (!data.success) {
        return toast.show(data.message, {type: 'danger', duration: 1000});
      }

      provider.setUserData(data.user);
      provider.setIsLoggedIn(true);
    } catch (error) {
      console.error('Error checking otp', error);
    } finally {
      setIsLoading1(false);
    }
  };

  const _checkOTP = async () => {
    try {
      setIsLoading(true);
      const checkData = route.params;

      const {data} = await services.resetPassword(checkData);
      console.log(data);
      if (!data.success) {
        return toast.show(data.message, {type: 'danger', duration: 1000});
      }

      setChecked(true);
    } catch (error) {
      // Alert('error');
      console.error('Error checking otp', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScreenHeader title="Confirm" onPress={() => navigation.goBack()} />
      {checked === 0 ? (
        <View style={styles.body}>
          <Text allowFontScaling={false} style={styles.headerText}>
            {`The confirmation code was sent to : "${route.params.email}" `}
          </Text>
          <TouchableOpacity>
            <Text allowFontScaling={false} style={styles.resendText}>
              Send again
            </Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            loading={isLoading}
            style={styles.button}
            contentStyle={{height: 45}}
            labelStyle={styles.buttonLabel}
            uppercase="false"
            textColor={COLOR_PALETTE.buttonTextColor}
            buttonColor={COLOR_PALETTE.buttonColor}
            onPress={_checkOTP}>
            {!isLoading && 'Check'}
          </Button>
        </View>
      ) : (
        <View style={styles.body}>
          <Text allowFontScaling={false} style={styles.headerText}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 40,
            }}>
            <TextInput
              value={pass}
              onChangeText={setPass}
              mode="contained"
              placeholder="Password"
              style={styles.input}
              textColor={COLOR_PALETTE.textColor}
              activeUnderlineColor={COLOR_PALETTE.primaryColor}
              underlineColor="darkgray"
              placeholderTextColor="#6D6B7E"
              returnKeyType="next"
              autoCapitalize="none"
              textContentType="password"
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            loading={isLoading1}
            contentStyle={{height: 45}}
            labelStyle={styles.buttonLabel}
            textColor={COLOR_PALETTE.buttonTextColor}
            buttonColor={COLOR_PALETTE.buttonColor}
            onPress={_resetPassword}>
            {!isLoading1 && 'Reset Password'}
          </Button>
        </View>
      )}
    </View>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    body: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: 70,
    },
    headerText: {
      fontFamily: FONTS.medium,
      fontSize: 15,
      textAlign: 'center',
      color: COLOR_PALETTE.textColor,
    },
    input: {
      width: 300,
      height: 50,
      backgroundColor: '#fff',
      marginHorizontal: 5,
    },
    resendText: {
      fontFamily: FONTS.medium,
      alignSelf: 'center',
      marginTop: 10,
      color: '#2167D2',
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
};

export default ResetPasswordScreen;
