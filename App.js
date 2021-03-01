/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Store from './src/redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoScreen from './src/screens/TodoScreen';
import ResizeImgScreens from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Store>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ResizeImgScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  );
};

const styles = StyleSheet.create({});

export default App;
