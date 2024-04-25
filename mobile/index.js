/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from "./src/app/store"
import { Provider } from 'react-redux'

function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          
          <App />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>

  );
}

AppRegistry.registerComponent(appName, () => Main);
