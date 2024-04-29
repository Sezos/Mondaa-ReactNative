import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProviderContext } from "../provider/Provider";
import TabNavigator from "./TabNavigation";
import JobScreen from "../screens/manager/JobScreen";
import LoginScreen from "../screens/LoginScreen";
import WorkerInfoScreen from "../screens/manager/WorkerInfoScreen";
import CreateProjectLocation from "../screens/manager/CreateProjectLocation";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import UserTabNavigator from "./UserTabNavigation";
import UserInfoScreen from "../screens/user/UserInfoScreen";
import WorkInfoScreen from "../screens/user/WorkInfoScreen";
import BankInfoScreen from "../screens/user/BankInfoScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OtpScreen from "../screens/OtpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AddWorkScreen from "../screens/manager/AddJobScreen";
import AddWorkerScreen from "../screens/manager/AddWorkerScreen";
import UserTimeSheet from "../screens/user/UserTimesheet";
import ManagerTimeSheet from "../screens/manager/ManagerTimesheet";
import ProjectLocation from "../screens/manager/ProjectLocations";
import UserJobScreen from "../screens/user/UserJobScreen";
import WorkerScreen from "../screens/manager/WorkerScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import SendNotification from "../screens/manager/SendNotification";
import ChatScreen from "../screens/Chats/ChatScreen";
import ChatUsers from "../screens/Chats/ChatUsers";
import EditGroupScreen from "../screens/Chats/EditGroupScreen";
import FilesScreen from "../screens/files/FilesScreen";
import FileScreen from "../screens/files/FileScreen";
import UserHomeScreen from "../screens/user/UserHomeScreen";

const Stack = createNativeStackNavigator();

const StackNavigators = ({}) => {
    const provider = useContext(ProviderContext);

    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            {!provider.isLoggedIn ? (
                <Stack.Group>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{
                            headerShown: false,
                            animation: "slide_from_left",
                        }}
                    />
                    <Stack.Screen
                        name="OtpScreen"
                        component={OtpScreen}
                        options={{
                            headerShown: false,
                            animation: "slide_from_left",
                        }}
                    />
                    <Stack.Screen
                        name="ResetPasswordScreen"
                        component={ResetPasswordScreen}
                        options={{
                            headerShown: false,
                            animation: "slide_from_left",
                        }}
                    />
                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordScreen}
                        options={{
                            headerShown: false,
                            animation: "slide_from_left",
                        }}
                    />
                    <Stack.Screen
                        name="TestScreen"
                        component={UserHomeScreen}
                        options={{
                            headerShown: false,
                            animation: "slide_from_left",
                        }}
                    />
                    {/* <Stack.Screen name="Screen" */}
                </Stack.Group>
            ) : (
                <Stack.Group>
                    {provider.userData.role === "Manager" ? (
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="ManagerTab"
                                component={TabNavigator}
                            />
                            <Stack.Screen
                                name="UserInfoScreen"
                                component={UserInfoScreen}
                            />
                            <Stack.Screen
                                name="AddWorkScreen"
                                component={AddWorkScreen}
                            />
                            <Stack.Screen
                                name="JobScreen"
                                component={JobScreen}
                            />
                            <Stack.Screen
                                name="EditGroupScreen"
                                component={EditGroupScreen}
                            />
                            <Stack.Screen
                                name="TimesheetScreen"
                                component={ManagerTimeSheet}
                            />
                            <Stack.Screen
                                name="SendNotification"
                                component={SendNotification}
                            />
                            <Stack.Screen
                                name="ProjectLocationScreen"
                                component={ProjectLocation}
                            />
                            <Stack.Screen
                                name="WorkerInfoScreen"
                                component={WorkerInfoScreen}
                            />
                            <Stack.Screen
                                name="AddWorkerScreen"
                                component={AddWorkerScreen}
                            />
                            <Stack.Screen
                                name="UserProfileScreen"
                                component={UserProfileScreen}
                            />
                            <Stack.Screen
                                name="CreateProjectLocationScreen"
                                component={CreateProjectLocation}
                            />
                        </Stack.Group>
                    ) : provider.userData.role === "Leader" ? (
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="UserMainScreen"
                                component={UserTabNavigator}
                            />
                            <Stack.Screen
                                name="LeaderInfoScreen"
                                component={UserInfoScreen}
                            />
                            <Stack.Screen
                                name="EditGroupScreen"
                                component={EditGroupScreen}
                            />
                            <Stack.Screen
                                name="JobScreen"
                                component={UserJobScreen}
                            />
                            <Stack.Screen
                                name="TimesheetScreen"
                                component={UserTimeSheet}
                            />
                            <Stack.Screen
                                name="UserInfoScreen"
                                component={UserInfoScreen}
                            />
                            <Stack.Screen
                                name="BankInfoScreen"
                                component={BankInfoScreen}
                            />
                            <Stack.Screen
                                name="WorkInfoScreen"
                                component={WorkInfoScreen}
                            />
                            <Stack.Screen
                                name="WorkerInfoScreen"
                                component={WorkerInfoScreen}
                            />
                        </Stack.Group>
                    ) : (
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="UserMainScreen"
                                component={UserTabNavigator}
                            />
                            <Stack.Screen
                                name="EditGroupScreen"
                                component={EditGroupScreen}
                            />
                            <Stack.Screen
                                name="JobScreen"
                                component={UserJobScreen}
                            />
                            <Stack.Screen
                                name="TimesheetScreen"
                                component={UserTimeSheet}
                            />
                            <Stack.Screen
                                name="UserInfoScreen"
                                component={UserInfoScreen}
                            />
                            <Stack.Screen
                                name="BankInfoScreen"
                                component={BankInfoScreen}
                            />
                            <Stack.Screen
                                name="WorkInfoScreen"
                                component={WorkInfoScreen}
                            />
                            <Stack.Screen
                                name="WorkerInfoScreen"
                                component={WorkerInfoScreen}
                            />
                        </Stack.Group>
                    )}
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="WorkerScreen"
                            component={WorkerScreen}
                        />
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                        />
                        <Stack.Screen name="ChatUsers" component={ChatUsers} />
                        <Stack.Screen
                            name="FilesScreen"
                            component={FilesScreen}
                        />
                        <Stack.Screen name="FileInfo" component={FileScreen} />
                    </Stack.Group>
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigators;
