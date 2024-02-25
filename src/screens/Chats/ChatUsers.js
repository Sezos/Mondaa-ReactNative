import React, { useContext, useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    KeyboardAvoidingView,
    Alert,
    TouchableOpacity,
} from "react-native";

import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { IconButton, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import services from "../../services/service";
import { ProviderContext } from "../../provider/Provider";
import { socket } from "../../utils/socket";
import UserEmptyList from "../../components/EmptyList2";
import { SheetManager } from "react-native-actions-sheet";
import JobAddWorkerItem from "../../components/manager/JobAddWorkerItem";
import AddUserIcon from "../../assets/icons/AddUserIcon";

const ChatUsers = ({ route, navigation }) => {
    const [users, setUsers] = useState(route.params.users);
    const title = route.params.title;

    const addUser = async () => {
        const result = await SheetManager.show("NotiAddSheet", {
            payload: users.map((emp) => emp.id),
        });
        if (!result?.added && !result?.removed) {
            return;
        }
        const { data } = await services.updateGroup(
            route.params.id,
            undefined,
            result?.added,
            result?.removed
        );

        if (data.success === true) {
            setUsers(data?.users);
        }
    };

    return (
        <View
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Header name={title} />
            <View
                style={{
                    backgroundColor: "white",
                    width: "90%",
                    marginTop: 20,
                    borderRadius: 20,
                    overflow: "hidden",
                }}
            >
                <TouchableOpacity
                    style={{
                        margin: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    onPress={addUser}
                >
                    <AddUserIcon />
                    <Text style={{ marginLeft: 10 }}>Add Users</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    backgroundColor: "white",
                    width: "90%",
                    marginTop: 20,
                    borderRadius: 20,
                    overflow: "hidden",
                    height: "75%",
                }}
            >
                <FlatList
                    data={users}
                    renderItem={({ item, index }) => (
                        <JobAddWorkerItem item={item} onPress={() => {}} />
                    )}
                    ItemSeparatorComponent={() =>
                        users.length > 0 && (
                            <Divider
                                style={{
                                    backgroundColor: COLOR_PALETTE.dividerColor,
                                }}
                            />
                        )
                    }
                />
            </View>
        </View>
    );
};

const Header = ({ name }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
                width: "100%",
            }}
        >
            <IconButton
                style={{ display: "flex", position: "absolute", left: 0 }}
                icon={"arrow-left"}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>{name}</Text>
        </View>
    );
};

export default ChatUsers;
