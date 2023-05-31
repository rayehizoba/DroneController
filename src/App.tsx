import React from 'react';
import tw from 'twrnc';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './navigators/MainNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <MainNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
