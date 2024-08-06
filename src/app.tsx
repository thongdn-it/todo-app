import React from 'react';
import {useColorScheme} from 'react-native';

import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {NativeBaseProvider, StatusBar} from 'native-base';

import {tdTheme} from './constants/themes';
import TDAppNavigator from './routes/main_navigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NativeBaseProvider theme={tdTheme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TDAppNavigator />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;
