// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MyCollection from '../screens/MyCollection';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../component/Header';
import { View,StyleSheet } from 'react-native';
import { Register } from '../screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const RootNavigation = () => {
  return (
    <View style={styles.container}>
     <Header />
    <Tab.Navigator
    //   initialRouteName="MyCollection"
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen 
      options={{
    tabBarLabel: 'Welcome',
    tabBarStyle: { backgroundColor: '#004225' },
    tabBarLabelStyle: { color: 'white'}, }} name="WelcomeScreen" component={WelcomeScreen} />
      <Tab.Screen 
      options={{
    tabBarLabel: 'MyCollection',
    tabBarStyle: { backgroundColor: '#004225' },
    tabBarLabelStyle: { color: 'white',}, }} name="MyCollection" component={MyCollection} />
    </Tab.Navigator>
      </View>
    );
};

const LoginNavigator = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RootNavigation" component={RootNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    img: {
      height: 200,
      width: 200,
    },
    button: {
      padding: 10,
      marginTop: 10,
    },
  });

export default LoginNavigator;
