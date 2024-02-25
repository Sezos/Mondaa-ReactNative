import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { COLOR_PALETTE, FONTS } from "../utils/Constants";
import { Button } from "react-native-paper";
import services from "../services/service";
import { useToast } from "react-native-toast-notifications";
import { ProviderContext } from "../provider/Provider";

global.Buffer = global.Buffer || require("buffer").Buffer;

const OtpScreen = ({ navigation, route }) => {
  const provider = useContext(ProviderContext);
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const toast = useToast();

  const _checkOTP = async () => {
    try {
      setIsLoading(true);
      const checkData = route.params;

      const { data } = await services.login(checkData);

      if (!data.success) {
        return toast.show(data.message, { type: "danger", duration: 1000 });
      }

      provider.setUserData(data.user);
      provider.setIsLoggedIn(true);
    } catch (error) {
      // Alert('error');
      console.error("Error checking otp", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScreenHeader title="Confirm" onPress={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text allowFontScaling={false} style={styles.headerText}>
          {`The confirmation code was sent to : "${route.params.email}" `}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 40,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Please Check your Email
          </Text>
        </View>
        <TouchableOpacity>
          <Text allowFontScaling={false} style={styles.resendText}>
            Send again
          </Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          loading={isLoading}
          style={styles.button}
          contentStyle={{ height: 45 }}
          labelStyle={styles.buttonLabel}
          textColor={COLOR_PALETTE.buttonTextColor}
          buttonColor={COLOR_PALETTE.buttonColor}
          onPress={_checkOTP}
        >
          {!isLoading && "Check"}
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
      marginTop: 70,
    },
    headerText: {
      fontFamily: FONTS.medium,
      fontSize: 15,
      textAlign: "center",
      color: COLOR_PALETTE.textColor,
    },
    input: {
      width: 45,
      height: 50,
      backgroundColor: "#fff",
      marginHorizontal: 5,
      textAlign: "center",
    },
    resendText: {
      fontFamily: FONTS.medium,
      alignSelf: "center",
      marginTop: 10,
      color: "#2167D2",
    },
    button: {
      width: "75%",
      borderRadius: 10,
      alignSelf: "center",
      marginTop: 20,
    },
    buttonLabel: {
      fontSize: 13,
      fontFamily: FONTS.bold,
    },
  });
};

export default OtpScreen;
