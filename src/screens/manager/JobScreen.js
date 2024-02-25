import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    Linking,
    Alert,
} from "react-native";

import Clipboard from "@react-native-clipboard/clipboard";
import { Button, IconButton } from "react-native-paper";
import services from "../../services/service";
import WorkerItem from "../../components/manager/WorkerItem";
import EmptyList from "../../components/EmptyList";
import UserEmptyList from "../../components/EmptyList2";
import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import { SheetManager } from "react-native-actions-sheet";
import { ProviderContext } from "../../provider/Provider";
import Geocoder from "react-native-geocoding";
import {
    GestureHandlerRootView,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

const JobScreen = ({ navigation, route }) => {
    const styles = useStyles();
    const [employees, setEmployees] = useState([]);
    const [userJSON, setUserJSON] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(ProviderContext);
    const toast = useToast();
    const project = route.params.data.ProjectLocation;
    const [geoPoint, setGeoPoint] = useState({});
    const [comment, setComment] = useState(route.params.data?.comment);

    useEffect(() => {
        _fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    Geocoder.init("AIzaSyAedG3JXI5i_r51I9Mydkb5SwRiQkOuiAo", {
        language: "en",
    });

    const _fetchData = async () => {
        Geocoder.from(project.location)
            .then((json) => {
                var location = json.results[0].geometry.location;
                setGeoPoint(location);
            })
            .catch((error) => console.warn(error));
        setIsLoading(true);
        try {
            const { data } = await services.getProjectWorker(
                route.params.data.id
            );
            setUserJSON(data.ProjectUsers);
            const employeeIds = data.ProjectUsers.map(
                (employee) => employee.User.id
            );
            setEmployees(employeeIds);
            context._countProjectUsers();
        } catch (error) {
            console.log("error fetching job", error);
        } finally {
            setIsLoading(false);
        }
    };

    const _addWorker = async () => {
        const result = await SheetManager.show("WorkerAddSheet", {
            payload: { employees: employees, date: route.params.date },
        });

        if (result?.added.length !== 0) {
            await services.addProjectUsers({
                projectId: route.params.data.id,
                userIds: result.added,
            });
        }

        if (result?.removed.length !== 0) {
            await services.removeProjectUsers({
                projectId: route.params.data.id,
                projectUserIds: result.removed,
            });
        }
        _fetchData();
    };

    const openInMaps = (type) => {
        if (type === "ios") {
            return Linking.openURL(
                `http://maps.apple.com/?q=${geoPoint.lat},${geoPoint.lng}`
            );
        } else if (type === "android") {
            return Linking.openURL(
                `https://google.com/maps/place/${geoPoint.lat},${geoPoint.lng}`
            );
        } else {
            Alert.alert("Copy Address", "The address has been copied", [
                {
                    text: "Okay",
                    style: "default",
                },
            ]);
            return Clipboard.setString(project.location);
        }
    };

    const updateData = async () => {
        const result = await SheetManager.show("UserInfoSheet", {
            payload: route.params.data?.comment,
        });
        console.log(result);
        if (result) {
            const update = await services.updateProject(route.params.data.id, {
                comment: result,
            });
            if (update.status === 200)
                toast.show("Updated Successfully!", {
                    type: "success",
                });
            setComment(result);
        }
    };

    return (
        <View style={StyleSheet.absoluteFill}>
            <View
                style={{
                    height: 60,
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                }}
            >
                <IconButton
                    icon="arrow-left"
                    iconColor="#04092199"
                    size={18}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {project.name}
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: "white",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <Button
                        onPress={() => {
                            openInMaps("ios");
                        }}
                    >
                        Apple Maps
                    </Button>
                    <Button
                        onPress={() => {
                            openInMaps("android");
                        }}
                    >
                        Google Maps
                    </Button>
                    <Button
                        onPress={() => {
                            openInMaps("clipboard");
                        }}
                    >
                        Copy
                    </Button>
                </View>
                {context.userData.role === "Manager" ? (
                    <GestureHandlerRootView>
                        <TouchableOpacity onPress={() => updateData("comment")}>
                            <View style={styles.item}>
                                <Text
                                    style={{
                                        minHeight: 50,
                                        margin: 20,
                                        borderRadius: 100,
                                    }}
                                >
                                    {comment}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </GestureHandlerRootView>
                ) : (
                    <Text
                        style={{
                            minHeight: 50,
                            margin: 20,
                            borderRadius: 100,
                        }}
                    >
                        {comment}
                    </Text>
                )}
            </View>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {userJSON.length > 0 ? (
                    <Text
                        allowFontScaling={false}
                        style={{
                            marginVertical: 10,
                            fontSize: 12,
                            fontFamily: FONTS.regular,
                            color: COLOR_PALETTE.textColor,
                        }}
                    >
                        Total: {userJSON.length} Workers
                    </Text>
                ) : null}
                <FlatList
                    data={userJSON}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <WorkerItem item={item.User} />}
                    initialNumToRender={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={_fetchData}
                        />
                    }
                    ListEmptyComponent={() => (
                        <UserEmptyList title="Sorry, It's empty!" />
                    )}
                />
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
};

const useStyles = () => {
    return StyleSheet.create({
        backButton: {
            backgroundColor: "#0409210A",
            borderRadius: 10,
            height: 30,
            width: 35,
        },
        floatButton: {
            width: 50,
            height: 50,
            position: "absolute",
            bottom: 20,
            right: 20,
        },
    });
};

export default JobScreen;
