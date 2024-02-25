import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    return token;
};

export const socket = io.connect("https://api.mondaa.com.au/events", {
    transports: ["websocket"],
    auth: {
        token: getUserToken(),
    },
});
