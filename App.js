/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateUser from './app/views/createUser';
import Login from './app/views/login';
import AppStack from './app/navigator/stack';

const App = () => {

  return (
<AppStack />
  );
};

const styles = StyleSheet.create({});

export default App;
