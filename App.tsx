/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native'
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'

const App = () => {

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#167270'} />
      <AppNavigation />
    </Provider>
  );
};


export default App;
