import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from './src/provider/Provider';
import {PaperProvider} from 'react-native-paper';
import './Firebase';

const Main = () => {
  return (
    <PaperProvider>
      <Provider>
        <App />
      </Provider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
