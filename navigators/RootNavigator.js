import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MyCollection from '../screens/MyCollection';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../component/Header';
import { View,StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import ApiComponent from '../component/ExchangeRate/ApiComponent';
import AddImg from '../component/AddImg';
// import AddImgScreen from '../screens/AddImgScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const MyCollectionNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyCollection"
      component={MyCollection}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddImg"
      component={AddImg}
      options={{
        tabBarLabel: 'AddImg',
        headerShown: true,
        tabBarStyle: { backgroundColor: 'green' },
        tabBarLabelStyle: { color: 'white' },
      }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  return (
    <View style={styles.container}>
     <Header />
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
     
    <Tab.Screen 
      options={{
    tabBarLabel: 'Welcome',
    headerShown: false,
    tabBarStyle: { backgroundColor: '#004225' },
    tabBarLabelStyle: { color: 'white'}, }} name="Welcome" component={WelcomeScreen} />
      <Tab.Screen 
      options={{
    tabBarLabel: 'MyCollection',
    headerShown: false,
    tabBarStyle: { backgroundColor: '#004225' },
    tabBarLabelStyle: { color: 'white',}, }} name="MyCollectionNavigator" component={MyCollectionNavigator} />
    <Tab.Screen 
      options={{
    tabBarLabel: 'Currency converter',
    headerShown: false,
    tabBarStyle: { backgroundColor: '#004225' },
    tabBarLabelStyle: { color: 'white'}, }} name="ApiComponent" component={ApiComponent} />
    </Tab.Navigator>
    {/* <Stack.Navigator>
          <Stack.Screen 
            options={{
          tabBarLabel: 'AddImage',
          headerShown: true,
          tabBarStyle: { backgroundColor: 'green' },
          tabBarLabelStyle: { color: 'white'}, }} name="AddImg" component={AddImg} />
          </Stack.Navigator> */}
     </View>
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

export default RootNavigator;
