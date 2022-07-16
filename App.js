import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import store from './src/redux/store';
import * as actions from './src/redux/actions';

LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  const [netInfo, setNetInfo] = useState()
  useEffect(()=>{
    checkNet()
  },[])
  const checkNet = () => {
    NetInfo.fetch().then(state => {
      console.log(state)
        setNetInfo(state.isConnected)
        // alert(`Connection type , ${state.type} isConnected? : ${state.isConnected}`)
    });
  }
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
