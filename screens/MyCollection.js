import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImgContainer from '../component/ImgContainer';
import Search from '../component/Search';
import AddImg from '../component/AddImg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyCollection = ({ navigation }) => {
  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <Text style={styles.text1}>My Collection </Text>
        <View style={styles.contimg}>
          <Search />
          <ImgContainer />
          <Pressable onPress={() => navigation.navigate('AddImg')}>
            <Text style={styles.addImg}>Add New</Text>
          </Pressable>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contimg: {
    flex: 1,
    backgroundColor: '#ebe294',
  },
  text1: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  addImg: {
    width: '80%',
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
});

const MyCollectionScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyCollection" component={MyCollection} />
      <Stack.Screen name="AddImg" component={AddImg} />
    </Stack.Navigator>
  );
};

export default MyCollectionScreen;

