import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Badge} from 'react-native-paper';

//Manager
import ManagerHomeScreen from '../screens/manager/ManagerHomeScreen';
import WorkerScreen from '../screens/manager/WorkerScreen';
import WorkScreen from '../screens/manager/WorkListScreen';
//Leader
import LeaderHomeScreen from '../screens/leader/LeaderHomeScreen';
//Employee
import UserHomeScreen from '../screens/user/UserHomeScreen';

import {COLOR_PALETTE} from '../utils/Constants';
import {ProviderContext} from '../provider/Provider';

//SVGs
import UserSvg from '../assets/TabIcons/User';
import WorkSvg from '../assets/TabIcons/Desk';
import HomeSvg from '../assets/TabIcons/Home';
import ManagerConterManager from '../screens/manager/ManagerContentManager';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import ChatScreen from '../screens/ChatsScreen';
import ChatSvg from '../assets/TabIcons/Chat';
import CreateTimeSheet from '../screens/leader/CreateTimeSheet';

const Tab = createBottomTabNavigator();

const TabNavigator = ({}) => {
  const styles = useStyles();
  const provider = useContext(ProviderContext);
  return (
    <Tab.Navigator>
      {provider.userData.role === 'Manager' ? (
        <Tab.Group screenOptions={{headerShown: false, tabBarShowLabel: false}}>
          <Tab.Screen
            name="ManagerHomeScreen"
            component={ManagerHomeScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <View>
                  {focused && <Badge size={7} style={styles.badge} />}
                  <HomeSvg />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="LeaderTimesheetScreen"
            component={CreateTimeSheet}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({focused}) => (
                <View>
                  {focused && <Badge size={7} style={styles.badge} />}
                  <WorkSvg />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Chats"
            component={ChatScreen}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({focused}) => (
                <View>
                  {focused && <Badge size={7} style={styles.badge} />}
                  <ChatSvg />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="ContentManager"
            component={ManagerConterManager}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({focused}) => (
                <View>
                  {focused && <Badge size={7} style={styles.badge} />}
                  <UserSvg />
                </View>
              ),
            }}
          />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen name="EmployeeHomeScreen" component={UserHomeScreen} />
        </Tab.Group>
      )}
    </Tab.Navigator>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: COLOR_PALETTE.tabBadgeColor,
    },
  });
};

export default TabNavigator;
