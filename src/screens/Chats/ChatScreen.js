import React, { useContext, useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    KeyboardAvoidingView,
    Alert,
} from "react-native";

import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { IconButton, TextInput } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import services from "../../services/service";
import { ProviderContext } from "../../provider/Provider";
import { socket } from "../../utils/socket";
import UserEmptyList from "../../components/EmptyList2";
import { SheetManager } from "react-native-actions-sheet";

const Message = ({ item, index }) => {
    return (
        <View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: item.isMine ? "flex-end" : "flex-start",
                    marginTop: 5,
                    marginBottom: 5,
                }}
            >
                <View>
                    <Text
                        style={{
                            paddingHorizontal: 20,
                            marginRight: 10,
                            marginLeft: 10,
                            width: "auto",
                            maxWidth: "50%",
                            borderRadius: 20,
                            textAlign: item.isMine ? "right" : "left",
                        }}
                    >
                        {item?.Sender?.firstName}
                    </Text>
                    <View
                        style={{
                            backgroundColor: item.isMine
                                ? "#00B2FF"
                                : "#F0F0F0",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginRight: 10,
                            marginLeft: 10,
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: item.isMine ? "right" : "left",
                            }}
                        >
                            {item?.body}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const ChatScreen = ({ route, navigation }) => {
    const provider = useContext(ProviderContext);
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState(route.params.title);
    const params = route.params;
    const scrollRef = useRef();
    const isFocused = useIsFocused();

    socket.on(`group_${params.id}`, (ll) => {
        if (ll && ll.senderId !== provider.userData.id) {
            setMessages([ll].concat(messages));
        } else {
            console.log("it's yours");
        }
    });

    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    const fetch = async () => {
        getTitle();
        const { data } = await services.getMessages(params.id, messages.length);
        setMessages(
            data.map((msg) => {
                return {
                    ...msg,
                    isMine: msg.senderId === provider.userData.id,
                };
            })
        );
    };
    const getTitle = async () => {
        const { data } = await services.getGroup(params.id);
        setTitle(data.name);
    };

    const loadMore = async () => {
        const { data } = await services.getMessages(params.id, messages.length);
        setMessages(
            messages.concat(
                data.map((msg) => {
                    return {
                        ...msg,
                        isMine: msg.senderId === provider.userData.id,
                    };
                })
            )
        );
    };

    const sendMessage = async (input1) => {
        const input = input1.trim();
        if (input === "") {
            return;
        }
        const { data } = await services.sendMessage(input, params.id);

        if (data.success) {
            setMessages(
                [
                    {
                        body: input,
                        senderId: provider.userData.id,
                        groupId: params.id,
                        isMine: true,
                    },
                ].concat(messages)
            );
        } else {
            Alert.alert("Error", data.message);
        }
    };

    const onPress = async () => {
        const { data } = await services.getGroupUsers(params.id);
        navigation.navigate("EditGroupScreen", {
            id: params.id,
            name: title,
            imgURL: params.imgURL,
            users: data,
        });
    };

    return (
        <View style={{ height: "100%" }}>
            <ChatHeader name={title} onPress={onPress} />
            <KeyboardAvoidingView
                behavior="height"
                style={{ backgroundColor: "white", flex: 1 }}
            >
                <View style={{ marginBottom: 100 }}>
                    <FlatList
                        onEndReached={loadMore}
                        inverted={true}
                        ref={scrollRef}
                        data={messages}
                        renderItem={Message}
                        initialNumToRender={10}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ transform: "scaleY(-1)" }}>
                                <UserEmptyList title="Welcome to the Chat" />
                            </View>
                        )}
                    />
                </View>
                <ChatInput onPress={sendMessage} />
            </KeyboardAvoidingView>
        </View>
    );
};

const ChatHeader = ({ name, onPress }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
                height: 100,
            }}
        >
            <IconButton
                style={{ display: "flex", position: "absolute", left: 0 }}
                icon={"arrow-left"}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Pressable onPress={onPress}>
                <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
                    {name}
                </Text>
            </Pressable>
        </View>
    );
};

const ChatInput = ({ onPress }) => {
    const [input, setInput] = useState("");

    return (
        <View
            style={{
                display: "flex",
                position: "absolute",
                bottom: 50,
                left: 0,
                alignItems: "center",
                width: "100%",
                // height: 75,
                paddingLeft: 40,
                flexDirection: "row",
            }}
        >
            {/* <IconButton icon="file-document-outline" /> */}
            <TextInput
                autoCorrect={false}
                style={{ width: "85%", backgroundColor: "transparent" }}
                value={input}
                onChangeText={(e) => {
                    setInput(e);
                }}
            />
            <IconButton
                icon="send-circle-outline"
                onPress={() => {
                    onPress(input);
                    setInput("");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ChatSection: {
        image: {
            width: 50,
            height: 50,
            marginRight: 10,
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

export default ChatScreen;
