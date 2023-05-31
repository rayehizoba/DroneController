import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import tw, {useDeviceContext} from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  useDeviceContext(tw);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, tw`flex-1`]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator
          screenOptions={{headerShown: false, cardStyle: backgroundStyle}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/*<Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />*/}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default MainNavigator;
