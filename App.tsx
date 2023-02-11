import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from './navigation';
import { persistor, store } from './store/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <StatusBar style='light' />
              <Navigation />
            </PersistGate>
          </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}