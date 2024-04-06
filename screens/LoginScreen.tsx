import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from "@react-native-firebase/database";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootNavigator from '../navigators/RootNavigator';

export default function LoginScreen() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const navigation = useNavigation();
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    if (response.user) {
      await db().ref(`/users/${response.user.uid}/name`).set(name);
    }
  };
  
  
  const registerAndgotoMenu = async () => {
    if (password && email) {
      try {
        const response = await auth().createUserWithEmailAndPassword(email, password);
        if (response.user) {
          await createProfile(response);
          // navigation.navigate('RootNavigator'); // Navigate to WelcomeScreen
        }
      } catch (e) {
        Alert.alert("Oops", "Please check your password and email")
      }
    }
  }
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to Numes</Text>
      <Text style={styles.regularText}>Login to continue</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={'email'}
        keyboardType={'email-address'}
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={onChangePassword}
        placeholder={'password'}
        keyboardType={'default'}
        secureTextEntry={true}
      />
      <Pressable onPress={registerAndgotoMenu} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#EDEFEE',
    backgroundColor: '#EDEFEE',
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 100,
    backgroundColor: '#EE9972',
    borderColor: '#EE9972',
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
});
