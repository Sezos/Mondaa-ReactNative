import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  TextInput,
  Button,
  Divider,
  Modal,
  Portal,
  Checkbox,
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { ProviderContext } from "../provider/Provider";
import { COLOR_PALETTE, FONTS } from "../utils/Constants";
import services from "../services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { StackActions } from "@react-navigation/native";
import LoginSvg from "../assets/LoginSvg";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import pkg from "./../../package.json";
import { Buffer } from "buffer";

global.Buffer = global.Buffer || require("buffer").Buffer;

const LoginScreen = ({ navigation }) => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkVersion();
    _syncDatas();
  }, []);

  const checkVersion = async () => {
    if (!pkg.version) {
      return;
    }

    try {
      const result = await services.check(pkg.version);
      if (result.status !== 201) {
        setStatus(
          "There is some problem with the server, please try again later"
        );
      }
      if (result.data.code !== 1) {
        setStatus(result.data.message);
      }
    } catch (err) {
      setStatus(
        "There is some problem with the server, please try again later"
      );
    }
  };

  const _syncDatas = async () => {
    const result = await AsyncStorage.multiGet([
      "isRemember",
      "username",
      "password",
    ]);
    if (result[0][1] === "true") {
      setIsRemember(true);
      setUsername(result[1][1]);
      setPassword(result[2][1]);
    } else {
      setIsRemember(false);
      setUsername("");
      setPassword("");
    }
  };

  const _handleLogin = async () => {
    setIsLoading(true);
    try {
      const { data } = await services.login({
        email: username,
        password: password,
      });

      if (data.success === true) {
        if (data.user.avatar) {
          const avatarURL = await services.getAvatarURL(
            data.access_token.toString()
          );

          const avatarResult = await services.getAvatar(
            avatarURL.data.s3_url + data.user.avatar
          );

          provider.setAvatar(
            `data:image/jpeg;base64,${Buffer.from(
              avatarResult.data,
              "binary"
            ).toString("base64")}`
          );
        }

        if (isRemember) {
          await AsyncStorage.setItem("isRemember", "true");
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.setItem("isRemember", "false");
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("password", password);
        }

        await AsyncStorage.setItem(
          "access_token",
          data.access_token.toString()
        );
        provider.setUserData(data.user);
        provider.setIsLoggedIn(true);
        if (data.user.role === "Manager") {
          navigation.navigate("ManagerTab");
        }
      } else {
        toast.show(data.message, { type: "danger", duration: 1000 });
      }
    } catch (error) {
      console.log("Error login", error);
    }

    setIsLoading(false);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureHandlerRootView>
        <ScrollView>
          <View
            style={{
              width: "70%",
              height: 250,
              paddingHorizontal: 10,
              alignSelf: "center",
            }}
          >
            <LoginSvg />
          </View>
          <View style={styles.body}>
            <Text allowFontScaling={false} style={styles.header}>
              Login
            </Text>
            <View style={styles.inputContainer}>
              <Icon name="at-outline" size={22} color="#6D6B7E" />
              <TextInput
                value={username}
                onChangeText={setUsername}
                mode="contained"
                placeholder="Email"
                style={styles.input}
                textColor={COLOR_PALETTE.textColor}
                activeUnderlineColor={COLOR_PALETTE.primaryColor}
                underlineColor="darkgray"
                placeholderTextColor="lightgray"
                returnKeyType="next"
                textContentType="username"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={22} color="#6D6B7E" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                mode="contained"
                placeholder="Password"
                textColor={COLOR_PALETTE.textColor}
                placeholderTextColor="lightgray"
                activeUnderlineColor={COLOR_PALETTE.primaryColor}
                underlineColor="darkgray"
                returnKeyType="done"
                secureTextEntry={passwordVisible}
                textContentType="password"
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye" : "eye-off"}
                    size={17}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text allowFontScaling={false} style={styles.forgotPassword}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Checkbox.Item
              label="Remember"
              mode="android"
              position="leading"
              color={COLOR_PALETTE.primaryColor}
              status={isRemember ? "checked" : "unchecked"}
              onPress={() => setIsRemember(!isRemember)}
              labelStyle={{
                fontSize: 13,
                fontFamily: FONTS.regular,
                color: COLOR_PALETTE.textColor,
                textAlign: "left",
              }}
            />
            <Button
              mode="contained"
              loading={isLoading}
              style={styles.button}
              contentStyle={{ height: 45 }}
              labelStyle={styles.buttonLabel}
              textColor={COLOR_PALETTE.buttonTextColor}
              buttonColor={COLOR_PALETTE.buttonColor}
              onPress={_handleLogin}
            >
              {!isLoading && "Login"}
            </Button>

            <View style={styles.infoLabelContainer}>
              <Divider style={styles.divider} />
              <Text allowFontScaling={false} style={styles.infoLabel}>
                Or
              </Text>
              <Divider style={styles.divider} />
            </View>

            <Button
              mode="contained"
              textColor={COLOR_PALETTE.textColor}
              style={styles.button}
              buttonColor="lightgray"
              labelStyle={styles.buttonLabel}
              contentStyle={{ height: 45 }}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Create Account
            </Button>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <Modal
        visible={status !== null}
        onDismiss={() => {
          setStatus(null);
        }}
        style={{
          backgroundColor: "white",
          borderRadius: 30,
          padding: 20,
          display: "flex",
          position: "absolute",
          left: "10%",
          top: "5%",
          width: "80%",
          height: "70%",
        }}
      >
        <Text>{status}</Text>

        <Button
          mode="contained"
          style={{ ...styles.button, marginTop: 100 }}
          contentStyle={{ height: 45 }}
          labelStyle={styles.buttonLabel}
          textColor={COLOR_PALETTE.buttonTextColor}
          buttonColor={COLOR_PALETTE.buttonColor}
          onPress={() => {
            setStatus(null);
          }}
        >
          Understood!
        </Button>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
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
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    input: {
      flex: 1,
      alignSelf: "center",
      backgroundColor: "transparent",
      marginVertical: 10,
      fontSize: 14,
      fontFamily: FONTS.regular,
    },
    forgotPassword: {
      fontSize: 12,
      fontFamily: FONTS.semiBold,
      alignSelf: "flex-end",
      color: "#2167D2",
    },
    button: {
      width: "75%",
      borderRadius: 10,
      alignSelf: "center",
    },
    buttonLabel: {
      fontSize: 13,
      fontFamily: FONTS.bold,
    },
    infoLabelContainer: {
      width: "100%",
      flexDirection: "row",
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    infoLabel: {
      fontSize: 11,
      marginHorizontal: 15,
      fontFamily: FONTS.regular,
    },
    divider: {
      width: "25%",
      backgroundColor: "darkgray",
    },
  });
};

export default LoginScreen;
