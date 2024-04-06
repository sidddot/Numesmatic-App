import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, SafeAreaView, Button, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import db from "@react-native-firebase/database";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const onRegisterPress = async () => {
    // try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      if (response.user) {
        // Set user data in the database
        await db().ref(`/users/${response.user.uid}`).set({ name });
        nav.navigate('WelcomeScreen'); // Navigate to WelcomeScreen after registration
      }
    // } catch (error) {
    //   Alert.alert("Error", "Failed to register. Please try again.");
    // }
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Register</Text>
          <View>
            <TextInput
              style={styles.loginTextField}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Button
            title="Sign Up"
            onPress={onRegisterPress}
          />
          <Button title="Go Back" onPress={() => nav.goBack()} />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginTextField: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#EDEFEE',
    backgroundColor: '#EDEFEE',
  },
});
