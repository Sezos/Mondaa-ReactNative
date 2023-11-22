import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, IconButton, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLOR_PALETTE, FONTS} from '../utils/Constants';
import SignUpSvg from '../assets/SignUpSvg';
import services from '../services/service';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Image} from 'react-native-svg';

const RegisterScreen = ({navigation}) => {
  const styles = useStyles();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [datas, setDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let experienceRef = useRef();
  let positionRef = useRef();
  let fstRef = useRef();
  let lstRef = useRef();
  let nickRef = useRef();
  let mailRef = useRef();
  let passRef = useRef();
  let rePassRef = useRef();
  let phoneRef = useRef();
  let addressRef = useRef();
  let ABNRef = useRef();
  let TFNRef = useRef();
  let visaRef = useRef();
  let wageRef = useRef();
  let emergencyNameRef = useRef();
  let emergencyEmailRef = useRef();
  let emergencyPhoneRef = useRef();

  const textInputs = [
    {
      description: 'First name',
      type: 'name',
      isRequired: true,
      name: 'firstName',
      ref: fstRef,
      icon: 'person-outline',
    },
    {
      description: 'Last name',
      type: 'name',
      isRequired: true,
      name: 'lastName',
      ref: lstRef,
      icon: 'people-outline',
    },
    {
      description: 'Nick name',
      type: 'name',
      isRequired: true,
      name: 'nickName',
      ref: nickRef,
      icon: 'people-outline',
    },
    {
      description: 'Email Address',
      type: 'emailAddress',
      isRequired: true,
      name: 'email',
      ref: mailRef,
      icon: 'mail-outline',
    },
    {
      description: 'Phone Number',
      type: 'telephoneNumber',
      isRequired: true,
      name: 'phone',
      ref: phoneRef,
      icon: 'call-outline',
    },
    {
      description: 'Password',
      type: 'password',
      isRequired: true,
      name: 'password',
      ref: passRef,
      icon: 'key-outline',
    },
    {
      description: 'Password Confirmation',
      type: 'password',
      isRequired: true,
      name: 'repassword',
      ref: passRef,
      icon: 'key-outline',
    },
    {
      description: 'Home Address',
      name: 'address',
      ref: addressRef,
      icon: 'location-outline',
    },
    {
      description: 'TFN',
      isRequired: false,
      name: 'workABN',
      ref: ABNRef,
      icon: 'reorder-three-outline',
    },
    {
      description: 'ABN',
      isRequired: false,
      name: 'workTFN',
      ref: TFNRef,
      icon: 'reorder-three-outline',
    },

    {
      description: 'Visa subclass (if applicable)',
      isRequired: false,
      name: 'workVisaType',
      ref: visaRef,
      icon: 'reorder-three-outline',
    },
    {
      description: 'Desired wage (Per hour)',
      isRequired: true,
      name: 'rate',
      ref: wageRef,
      icon: 'reorder-three-outline',
    },
    {
      description: 'Emergency Contact Name',
      name: 'emergencyName',
      ref: emergencyNameRef,
      icon: 'person-outline',
    },
    {
      description: 'Emergency Contact Email address',
      name: 'emergencyEmail',
      ref: emergencyEmailRef,
      icon: 'people-outline',
    },
    {
      description: 'Emergency Contact Phone Number',
      name: 'emergencyPhone',
      ref: emergencyPhoneRef,
      icon: 'call-outline',
    },
    {
      description: 'Steel fixing experience (Year)',
      name: 'experience',
      ref: experienceRef,
      isRequired: true,
      icon: 'construct-outline',
    },
    {
      description: 'Position (Worker, Leading Hand, Foreman)',
      name: 'position',
      ref: positionRef,
      isRequired: true,
      icon: 'man-outline',
    },
  ];

  const checkData = () => {
    if (datas.password !== datas.repassword) {
      Alert.alert('Warning', "Passwords don't match!", [
        {
          text: 'Ok',
        },
      ]);
      return false;
    }

    const inputs = [];

    textInputs.forEach(input => {
      if (input.isRequired === true) {
        inputs.push(input.name);
      }
    });

    let stop = false;

    inputs.forEach(input => {
      if (!stop && datas[input] === undefined) {
        Alert.alert(`Please check ${input} field.`, [{text: 'Ok'}]);
        stop = true;
        return 0;
      }
    });
    return 1;
  };

  const _handleRegister = async () => {
    if (!checkData()) {
      return;
    }

    const {data} = await services.register(datas);

    if (!data.success) {
      Alert.alert('Warning', data.message, [{text: 'Ok'}]);
      return;
    }

    navigation.navigate('OtpScreen', {
      email: datas.email,
      password: datas.password,
    });
  };

  const _onChange = (field, data) => {
    setDatas({...datas, [field]: data});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={StyleSheet.absoluteFill}>
      <GestureHandlerRootView>
        <ScrollView>
          <IconButton
            icon="close"
            iconColor="red"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.imageContainer}>
            <SignUpSvg />
          </View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.header}>
                Register
              </Text>
              <View style={{flex: 1}}>
                {textInputs.map((field, idx) => {
                  return (
                    <View key={idx} style={styles.inputContainer}>
                      <Icon name={field.icon} size={22} color="#6D6B7E" />
                      <TextInput
                        value={datas[field.name]}
                        onChangeText={data => {
                          _onChange(field.name, data);
                        }}
                        onSubmitEditing={() => {
                          if (idx !== textInputs.length - 1) {
                            return textInputs[idx + 1].ref.current?.focus();
                          }
                        }}
                        mode="contained"
                        placeholder={
                          field.description + (field.isRequired ? '*' : '')
                        }
                        style={styles.input}
                        textColor={COLOR_PALETTE.textColor}
                        activeUnderlineColor={COLOR_PALETTE.primaryColor}
                        underlineColor="darkgray"
                        placeholderTextColor="#6D6B7E"
                        returnKeyType="next"
                        textContentType={field.type}
                        secureTextEntry={
                          field.type === 'password' ? passwordVisible : false
                        }
                        right={
                          field.type === 'password' ? (
                            <TextInput.Icon
                              icon={passwordVisible ? 'eye' : 'eye-off'}
                              size={17}
                              onPress={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          ) : (
                            false
                          )
                        }
                      />
                    </View>
                  );
                })}
                <Button
                  mode="contained"
                  loading={isLoading}
                  style={styles.button}
                  contentStyle={{height: 45}}
                  labelStyle={styles.buttonLabel}
                  textColor={COLOR_PALETTE.buttonTextColor}
                  buttonColor={COLOR_PALETTE.buttonColor}
                  onPress={_handleRegister}>
                  {!isLoading && 'Continue'}
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingBottom: 20,
    },
    body: {
      flex: 1,
      paddingHorizontal: 15,
    },
    imageContainer: {
      width: '70%',
      height: 250,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    header: {
      fontSize: 22,
      marginVertical: 10,
      fontFamily: FONTS.bold,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 5,
    },
    input: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: 'transparent',
      fontSize: 14,
      fontFamily: FONTS.regular,
    },
    button: {
      width: '75%',
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 10,
    },
    buttonLabel: {
      fontSize: 13,
      fontFamily: FONTS.bold,
    },
  });
};

export default RegisterScreen;
