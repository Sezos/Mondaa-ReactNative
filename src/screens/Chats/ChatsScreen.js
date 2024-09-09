import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import {
  FlatList,
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// import {ProviderContext} from './../provider/Provider';
import services from "../../services/service";
import { socket } from "../../utils/socket";
import UserEmptyList from "../../components/EmptyList2";
import { SheetManager } from "react-native-actions-sheet";
import { ProviderContext } from "../../provider/Provider";
const ChatsScreen = ({}) => {
  const [groups, setGroups] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  socket.onAny((eventName, chat) => {
    console.log("eventName", eventName);
    console.log("chat", chat);
    if (eventName.split("_")[0] === "group") {
      fetch();
    }
  });

  useEffect(() => {
    fetch();
  }, [isFocused]);

  const fetch = async () => {
    setIsRefreshing(true);
    const { data } = await services.getGroups();
    setGroups(
      data.map((dat) => {
        return {
          id: dat.id,
          title: dat.name,
          lastChat: dat.message?.body,
          date: dat.message?.TimeStamp?.split("T")[0],
          status: 1,
          imgURL: dat.imgURL,
        };
      })
    );
    setIsRefreshing(false);
  };

  const createGroup = async () => {
    const emps = await SheetManager.show("AddGroupSheet");
    if (!emps) {
      return;
    }
    const name = await SheetManager.show("CreateGroupSheet", {
      payload: { employees: emps },
    });
    if (!name) {
      return;
    }
    await services.createGroup(
      name,
      emps.map((emp) => emp.id)
    );
    fetch();
  };

  return (
    <View>
      <View>
        <GestureHandlerRootView>
          <FlatList
            ListHeaderComponent={() => {
              return <ChatHeader onPress={createGroup} />;
            }}
            onRefresh={fetch}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={fetch} />
            }
            style={{ height: "100%" }}
            data={groups}
            renderItem={({ item }) => (
              <ChatSection
                id={item.id}
                title={item.title}
                lastChat={item.lastChat}
                date={item.date}
                status={item.status}
                imgURL={item.imgURL}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <UserEmptyList title="Sorry, You don't have any chat!" />
            )}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

const ChatHeader = ({ onPress }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
      <Text style={{ fontFamily: FONTS.bold, fontSize: 20, marginLeft: 20 }}>
        Chat
      </Text>
      <IconButton icon={"plus-circle-outline"} onPress={onPress} />
    </View>
  );
};

const ChatSection = ({ id, title, imgURL, lastChat, date, status }) => {
  const provider = useContext(ProviderContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          id: id,
          imgURL: imgURL,
        });
      }}
    >
      <View style={styles.ChatSection.Body}>
        <View style={styles.ChatSection.leftSide}>
          <View>
            <Image
              style={styles.ChatSection.image}
              resizeMode="contain"
              source={
                imgURL
                  ? { uri: provider.s3URL + imgURL }
                  : require("../../assets/job_icon.png")
              }
            />
          </View>
          <View>
            <Text style={styles.ChatSection.title}>{title}</Text>
            <Text style={styles.ChatSection.lastChat}>{lastChat}</Text>
          </View>
        </View>
        <View style={styles.ChatSection.rightSide}>
          {/* <Text style={styles.ChatSection.status}>{status}</Text> */}
          <Text style={styles.ChatSection.date}>{date}</Text>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ChatSection: {
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 1000,
    },
    rightSide: { display: "flex", flexDirection: "row" },
    lastChat: {
      color: "gray",
    },
    date: {
      color: "gray",
      paddingLeft: 10,
    },
    title: {
      paddingBottom: 10,
      fontSize: 20,
      fontFamily: FONTS.regular,
    },
    Body: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    leftSide: {
      display: "flex",
      flexDirection: "row",
    },
  },
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

export default ChatsScreen;
