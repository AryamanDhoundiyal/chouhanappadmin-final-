import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { server_url } from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    Alert.alert('Debug', 'Login button pressed!'); // Initial test alert
  
    try {
      const response = await axios.post(`${server_url}/Login`, {
        email,
        password,
      });
  
      console.log('API Response:', response.data); // Log the full API response
  
      if (response.data.success) {
        const { token, employee } = response.data;

        const designation = employee?.designation;
        const employee_username = employee?.employee_username;
        
        console.log('Token:', token);
        console.log('Designation:', designation);
        console.log('Employee Username:', employee_username);
  
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token); // Storing the token
        const storedToken = await AsyncStorage.getItem('authToken'); // Retrieving the token to verify
        console.log('Stored Token:', storedToken); // Logging the stored token
  
        if (designation === 'Admin' || designation === 'Manager') {
          console.log('Navigating to CBbuilder with:', {
            designation: designation,
            isManager: designation === 'Manager',
          });
          navigation.navigate('CBbuilder', {
            designation: designation,
            isManager: designation === 'Manager', // Pass a flag to indicate if the user is a Manager
          });
        } else {
          console.log('Navigating to Profile with employeeUsername:', employee_username);
          navigation.navigate('Profile', {
            employeeUsername: employee_username, // Pass employee_username to Profile
          });
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Unable to log in. Please check your network connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68689E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Login;
