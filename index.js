import { registerRootComponent } from "expo";

import App from "./App";
import { PaperProvider } from "react-native-paper";
import { Provider } from "./src/provider/Provider";
import "./Firebase";

const main = () => {
    return (
        <PaperProvider>
            <Provider>
                <App />
            </Provider>
        </PaperProvider>
    );
};
registerRootComponent(main);
