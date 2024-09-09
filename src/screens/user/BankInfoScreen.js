import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useToast } from "react-native-toast-notifications";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import { ProviderContext } from "../../provider/Provider";
import { COLOR_PALETTE } from "../../utils/Constants";
import services from "../../services/service";

const BankInfoScreen = ({ navigation }) => {
  const provider = useContext(ProviderContext);
  const styles = useStyles();
  const toast = useToast();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    const { data } = await services.getUserInfo();
    setUserData(data);
  };

  const updateData = async (title) => {
    const result = await SheetManager.show("BankInfoSheet", {
      payload: userData[title],
    });
    if (result) {
      const newData = { ...userData };
      newData[title] = result;
      setUserData({ ...newData });
      const { data } = await services.setUserInfo(newData);
      if (data.status === "Verified")
        toast.show("Updated Successfully!", {
          type: "success",
        });
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="#04092199"
          size={18}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={{ marginLeft: 10 }}>Bank </Text>
      </View>
      <View style={styles.body}>
        <Text allowFontScaling={false} style={styles.title}>
          Bank Info
        </Text>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => updateData("accountBSB")}>
            <View style={styles.item}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="card-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  BSB
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userData.accountBSB ? userData.accountBSB : "-"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData("accountNumber")}>
            <View style={styles.item}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="person-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Account Number
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userData.accountNumber ? userData.accountNumber : "-"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateData("accountName")}>
            <View style={styles.item}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="person-outline" size={13} color="#D1CFCF" />
                <Text allowFontScaling={false} style={styles.itemCaption}>
                  Account Name
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={styles.itemValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userData.accountName ? userData.accountName : "-"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      height: 60,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      backgroundColor: "#0409210A",
      borderRadius: 10,
      height: 30,
      width: 35,
    },
    body: {
      flex: 1,
      paddingHorizontal: 15,
    },
    itemContainer: {
      backgroundColor: "#fff",
      marginVertical: 5,
      borderRadius: 10,
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 18,
      color: COLOR_PALETTE.textColor,
      marginTop: 10,
    },
    itemCaption: {
      fontSize: 14,
      color: "#D1CFCF",
      marginLeft: 5,
    },
    itemValue: {
      flex: 1,
      fontSize: 14,
      color: COLOR_PALETTE.textColor,
      textAlign: "right",
      marginLeft: 30,
    },
  });
};

export default BankInfoScreen;
