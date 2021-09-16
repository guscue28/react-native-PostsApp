import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import Routes from './stackRoutes';
import Home from './drawer';

const Stack = createStackNavigator();

const Header = () => {
  <View
  style={{width: '100%', height: 45, backgroundColor: 'red' }}
  />
}

const getButton = ({ navigation }) => {
  <TouchableOpacity
    style={{ flexDirection: 'row' }}
    onPress={ () => navigation.goBack()}
  >
  <Text style={{color: '#FFF'}}>Back</Text>
  </ TouchableOpacity>
}

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Routes.Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewPosts"
          component={Routes.ViewPosts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateUser"
          component={Routes.CreateUser}
          // @ts-ignore
          options={( props ) => ({
            headerStyle: {
              backgroundColor: '#6685A4',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
          })}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;