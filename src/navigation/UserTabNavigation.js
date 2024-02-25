import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Badge } from "react-native-paper";

import { COLOR_PALETTE } from "../utils/Constants";

import HomeSvg from "../assets/TabIcons/Home";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import UserSvg from "../assets/TabIcons/User";
import { ProviderContext } from "../provider/Provider";
import WorkSvg from "../assets/TabIcons/Desk";
import UserHomeScreen from "../screens/user/UserHomeScreen";
import CreateTimeSheet from "../screens/leader/CreateTimeSheet";
import ChatsScreen from "../screens/Chats/ChatsScreen";
import ChatSvg from "../assets/TabIcons/Chat";

const Tab = createBottomTabNavigator();

const UserTabNavigator = ({ navigation }) => {
    const provider = useContext(ProviderContext);

    const styles = useStyles();

    return (
        <Tab.Navigator initialRouteName="UserHomeScreen">
            <Tab.Screen
                name="UserHomeScreen"
                component={UserHomeScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {focused && <Badge size={7} style={styles.badge} />}
                            <HomeSvg />
                        </View>
                    ),
                }}
            />
            {provider.userData.role === "Leader" ? (
                <Tab.Screen
                    name="LeaderTimesheetScreen"
                    component={CreateTimeSheet}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <View>
                                {focused && (
                                    <Badge size={7} style={styles.badge} />
                                )}
                                <WorkSvg />
                            </View>
                        ),
                    }}
                />
            ) : (
                <></>
            )}
            <Tab.Screen
                name="Chats"
                component={ChatsScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {focused && <Badge size={7} style={styles.badge} />}
                            <ChatSvg />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {focused && <Badge size={7} style={styles.badge} />}
                            <UserSvg />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const useStyles = () => {
    return StyleSheet.create({
        badge: {
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: COLOR_PALETTE.tabBadgeColor,
        },
    });
};

export default UserTabNavigator;
