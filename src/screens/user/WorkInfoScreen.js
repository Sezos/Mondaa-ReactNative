import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {
    FlatList,
    GestureHandlerRootView,
    RefreshControl,
} from "react-native-gesture-handler";
import { ProviderContext } from "../../provider/Provider";
import { COLOR_PALETTE } from "../../utils/Constants";
import { Button, IconButton, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import services from "../../services/service";
import ImagePicker from "react-native-image-crop-picker";

const fileInputs = [
    { label: "Rate", type: "text", name: "rate" },
    { label: "Code", type: "text", name: "employeeId" },
    {
        label: "Photo ID (Front)",
        type: "file",
        isRequired: true,
        name: "PhotoID",
    },
    {
        label: "Photo ID (back)",
        type: "file",
        isRequired: true,
        name: "PhotoIDBack",
    },
    {
        label: "White Card (Front)",
        type: "file",
        isRequired: true,
        name: "workWhiteCard",
    },
    {
        label: "White Card (Back)",
        type: "file",
        isRequired: true,
        name: "workWhiteCardBack",
    },
    {
        label: "Any other Cards if applicable",
        type: "files",
        isRequired: true,
        name: "OtherCard",
    },
];

const WorkInfoScreen = ({ navigation }) => {
    const styles = useStyles();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        _fetchData();
    }, []);

    const handleFile = async (name) => {
        const result = await ImagePicker.openPicker({
            includeBase64: true,
            mediaType: "photo",
            loadingLabelText: "Loading, Please Wait!",
        });
        setIsLoading(true);
        const { data } = await services.uploadImage({
            image: `data:${result.mime};base64,${result.data}`,
            type: name,
        });

        setUserData({ ...userData, [name]: data });
        setIsLoading(false);
    };

    const _fetchData = async () => {
        const { data } = await services.getUserInfo();
        setUserData(data);
    };

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Image is being uploaded! Please wait</Text>
                <ActivityIndicator size="large" color="gray" />
            </View>
        );
    }

    const RenderItem = ({ field }) => {
        const styles = useStyles();
        const provider = useContext(ProviderContext);

        return (
            <TouchableOpacity
                onPress={() => {
                    handleFile(field.name);
                }}
                style={{
                    display: "flex",
                    height:
                        field.type === "text" || !userData[field.name]
                            ? 75
                            : 400,
                }}
                disabled={field.type === "text"}
            >
                <View style={styles.itemContainer}>
                    {field.type === "text" ? (
                        <View style={styles.item}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Icon
                                    name="person-outline"
                                    size={13}
                                    color="#D1CFCF"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.itemCaption}
                                >
                                    {field.label}
                                </Text>
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={styles.itemValue}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {userData[field.name]}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.itemZurag}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Icon
                                    name="person-outline"
                                    size={13}
                                    color="#D1CFCF"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.itemCaption}
                                >
                                    {field.label}
                                </Text>
                            </View>

                            {userData[field.name] ? (
                                <Image
                                    style={{
                                        width: "90%",
                                        marginTop: 20,
                                        alignSelf: "center",
                                        height: "90%",
                                    }}
                                    source={{
                                        uri:
                                            provider.s3URL +
                                            userData[field.name],
                                    }}
                                />
                            ) : (
                                <Text>Click here to upload!</Text>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ height: "100%" }}>
            <View style={styles.headerContainer}>
                <IconButton
                    icon="arrow-left"
                    iconColor="#04092199"
                    size={18}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    Work Info
                </Text>
            </View>

            <GestureHandlerRootView>
                <FlatList
                    style={{ paddingHorizontal: 15, height: "90%" }}
                    data={fileInputs}
                    renderItem={({ item, idx }) => {
                        return <RenderItem key={idx} field={item} />;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                        <UserEmptyList title="Sorry, Something is wrong" />
                    )}
                />
            </GestureHandlerRootView>
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
        itemZurag: {
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "column",
        },
        title: {
            fontSize: 18,
            color: COLOR_PALETTE.textColor,
            fontWeight: "bold",
            margin: 10,
        },
        itemCaption: {
            fontSize: 14,
            color: "black",
            marginLeft: 5,
        },
        itemValue: {
            fontSize: 14,
            color: COLOR_PALETTE.textColor,
            textAlign: "right",
            marginLeft: 30,
        },
    });
};

export default WorkInfoScreen;
