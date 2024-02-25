/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform, Linking, Alert } from "react-native";

import {
    Button,
    DataTable,
    IconButton,
    TextInput,
    DataTableRow,
} from "react-native-paper";

import services from "../../services/service";
import { COLOR_PALETTE } from "../../utils/Constants";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";

export default function SendNotification({ navigation }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        _fetchUsers();
    }, []);

    const _fetchUsers = async () => {
        const employees = await services.getEmployees();
        setUsers(employees.data);
    };

    const _addWorker = async () => {
        const result = await SheetManager.show("NotiAddSheet", {
            payload: selectedUsers,
        });
        if (result?.added.length !== 0) {
            setSelectedUsers(selectedUsers.concat(result.added));
        }
        if (result?.removed.length !== 0) {
            setSelectedUsers(
                selectedUsers.filter((user) => !result?.removed.includes(user))
            );
        }
    };
    const send = async () => {
        try {
            const datas = {
                title,
                body,
                userIds: selectedUsers,
            };
            const { data } = await services.sendNotification(datas);
            Alert.alert("Success", "Your notification has been sent!");
            setBody("");
            setTitle("");
            setSelectedUsers([]);
        } catch (err) {
            Alert.alert("Error", err);
            console.log(err);
        }
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    height: 60,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            icon="arrow-left"
                            iconColor="#04092199"
                            size={18}
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        />
                        <Text>Send Notification</Text>
                    </View>

                    <IconButton
                        icon={"send-circle"}
                        iconColor={COLOR_PALETTE.buttonColor}
                        onPress={send}
                    />
                </View>
            </View>
            <View>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Title"
                    textColor={COLOR_PALETTE.textColor}
                    activeUnderlineColor={COLOR_PALETTE.primaryColor}
                    returnKeyType="done"
                    clearButtonMode="while-editing"
                />
                <TextInput
                    value={body}
                    onChangeText={setBody}
                    style={styles.input}
                    placeholder="Body"
                    textColor={COLOR_PALETTE.textColor}
                    activeUnderlineColor={COLOR_PALETTE.primaryColor}
                    returnKeyType="done"
                    clearButtonMode="while-editing"
                />

                <DataTable style={{ paddingBottom: 370 }}>
                    <DataTable.Header>
                        <DataTable.Title>Code</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                    </DataTable.Header>
                    <GestureHandlerRootView>
                        <ScrollView
                            contentContainerStyle={{ paddingHorizontal: 24 }}
                            style={{ height: "100%" }}
                        >
                            {users &&
                                users.length !== 0 &&
                                users.map((user, idx) => {
                                    if (selectedUsers.includes(user.id)) {
                                        return (
                                            <DataTable.Row key={idx}>
                                                <DataTable.Cell>
                                                    {user.employeeId}
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    {user.firstName +
                                                        " " +
                                                        user.lastName}
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        );
                                    } else {
                                        return <View key={idx} />;
                                    }
                                })}
                        </ScrollView>
                    </GestureHandlerRootView>
                </DataTable>
            </View>
            <IconButton
                icon="account-plus-outline"
                iconColor="#fff"
                containerColor={COLOR_PALETTE.primaryColor}
                style={styles.floatButton}
                onPress={_addWorker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ModalStyle: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 20,
        display: "flex",
        alignSelf: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    input: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "#fff",
        color: "#000",
    },
    floatButton: {
        width: 50,
        height: 50,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
