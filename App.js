import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as actions from './src/redux/actions';

LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
