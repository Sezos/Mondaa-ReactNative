import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { LogBox, StatusBar } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/Ionicons";

import CustomCalendar from "./src/components/CustomCalendar";
import "./src/components/sheets";
import StackNavigators from "./src/navigation/StackNavigation";
import "./src/provider/Provider";
import { ProviderContext } from "./src/provider/Provider";

LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "Non-serializable values were found in the navigation state",
]);

const App = () => {
    const provider = useContext(ProviderContext);
    return (
        <SheetProvider>
            <ToastProvider
                animationDuration={250}
                animationType="slide-in"
                duration={1000}
                successColor="#54AE93"
                successIcon={
                    <Icon
                        name="information-circle-outline"
                        size={20}
                        color="#fff"
                    />
                }
                textStyle={{ fontSize: 13, color: "#fff" }}
            >
                <SafeAreaProvider
                    style={{ flex: 1, backgroundColor: "#F2F2F2" }}
                >
                    <SafeAreaView
                        style={{ flex: 1, backgroundColor: "white" }}
                        edges={["top"]}
                        mode="margin"
                    >
                        <NavigationContainer>
                            <StatusBar barStyle="dark-content" />
                            <StackNavigators />
                            {provider.calendarVisible && <CustomCalendar />}
                        </NavigationContainer>
                    </SafeAreaView>
                </SafeAreaProvider>
            </ToastProvider>
        </SheetProvider>
    );
};

export default App;
