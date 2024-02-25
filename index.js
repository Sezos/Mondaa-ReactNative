import { registerRootComponent } from "expo";

import App from "./App";
import { PaperProvider } from "react-native-paper";
import { Provider } from "./src/provider/Provider";
import "./Firebase";
import { AppRegistry } from "react-native";

const main = () => {
    return (
        <PaperProvider>
            <Provider>
                <App />
            </Provider>
        </PaperProvider>
    );
};
AppRegistry.registerComponent("main", () => App);
registerRootComponent(main);
