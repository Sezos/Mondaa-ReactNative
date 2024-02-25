/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import {
    Divider,
    TextInput,
    Avatar,
    Button,
    IconButton,
} from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";
import { COLOR_PALETTE, FONTS } from "../../utils/Constants";
import services from "../../services/service";
import JobAddWorkerItem from "../../components/manager/JobAddWorkerItem";
import { useToast } from "react-native-toast-notifications";
import { ProviderContext } from "../../provider/Provider";
import AddUserIcon from "../../assets/icons/AddUserIcon";
import LeaveIcon from "../../assets/icons/LeaveIcon";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const EditGroupScreen = ({ navigation, route }) => {
    const provider = useContext(ProviderContext);

    const toast = useToast();
    const [imgURL, setImgURL] = useState(route.params.imgURL);
    const [employees, setEmployees] = useState(route.params.users);
    const [name, setName] = useState(route.params.name);
    const group_id = route.params.id;

    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleEdit = async () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            setIsLoading(true);
            if (name === route.params.name) {
                setIsEdit(false);
                setIsLoading(false);
                return;
            }
            const { data } = await services.updateGroup(
                route.params.id,
                name,
                undefined,
                undefined
            );
            console.log(data);
            toast.show(data.message, {
                type: data.success ? "success" : "danger",
            });
            setIsLoading(false);
            setIsEdit(false);
        }
    };

    const _leave = async () => {
        try {
            await services.leaveGroup(group_id);
            navigation.pop(2);
        } catch (err) {
            console.log(err);
        }
    };

    const leaveGroup = () => {
        Alert.alert("Leave Chat", "Are you sure to leave the chat?", [
            {
                text: "Yes",
                style: "destructive",
                onPress: () => _leave(),
            },
            {
                text: "No",
                style: "cancel",
            },
        ]);
    };

    const changeImage = async () => {
        try {
            setIsLoading(true);
            const result = await ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                includeBase64: true,
                cropperCircleOverlay: true,
                mediaType: "photo",
                loadingLabelText: "Loading, Please Wait!",
            });

            const { data } = await services.setGroupImage(route.params.id, {
                image: `data:${result.mime};base64,${result.data}`,
            });
            if (data.success) {
                setImgURL(data.url);
                toast.show("Picture is changed successfully", {
                    type: "success",
                });
            }
        } catch (error) {
            toast.show("There was error while changing Group Picture", {
                type: "danger",
            });
            // console.error('Error changing profile', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View>
            <View
                style={{
                    height: 60,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                }}
            >
                <IconButton
                    icon="arrow-left"
                    iconColor="#04092199"
                    disabled={isLoading}
                    size={18}
                    onPress={() => navigation.goBack()}
                />
                <Button onPress={toggleEdit} disabled={isLoading}>
                    {isEdit ? "Done" : "Edit"}
                </Button>
                {/* <Button onPress={handleCreate}>+</Button> */}
            </View>
            <View>
                <View style={{ display: "flex", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={changeImage}
                        disabled={isLoading || !isEdit}
                    >
                        <Avatar.Image
                            size={100}
                            source={
                                imgURL
                                    ? { uri: provider.s3URL + imgURL }
                                    : require("../../assets/job_icon.png")
                            }
                        ></Avatar.Image>
                    </TouchableOpacity>
                    {isEdit ? (
                        <TextInput
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginTop: 20,
                                backgroundColor: "white",
                                width: "60%",
                            }}
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                            }}
                        />
                    ) : (
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginTop: 20,
                            }}
                        >
                            {name}
                        </Text>
                    )}
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingTop: 20,
                    }}
                ></View>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: 'center',
                        paddingTop: 20,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            margin: 10,
                            display: "flex",
                        }}
                        onPress={() => {
                            navigation.navigate("ChatUsers", {
                                users: employees,
                                title: name,
                            });
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                minWidth: "90%",
                                width: "90%",
                                height: 50,
                                borderRadius: 20,
                                paddingLeft: 20,
                                justifyContent: "center",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <Text>Chat Users</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: 10 }}
                        onPress={leaveGroup}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                minWidth: "90%",
                                width: "90%",
                                height: 50,
                                borderRadius: 20,
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <LeaveIcon />
                            <Text>Leave Group</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditGroupScreen;
