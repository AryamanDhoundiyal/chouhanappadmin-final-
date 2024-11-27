import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { server_url } from '../config';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!name || !mobile || !email || !password) {
      alert('Error', 'Please fill out all fields.');
    } else {
      alert(
        `Submission Successful Name: ${name}Mobile No: ${mobile}Email: ${email}Password: ${password}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-left" size={24} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>My Account</Text>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} 
          style={styles.profileImage} 
        />
      </View>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={[styles.input, name && styles.inputFilled]}
          />
          <View style={styles.underlineContainer}>
            <View style={[styles.underline, name && styles.underlineFilled]} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Mobile No"
            value={mobile}
            onChangeText={setMobile}
            style={[styles.input, mobile && styles.inputFilled]}
            keyboardType="numeric"
          />
          <View style={styles.underlineContainer}>
            <View style={[styles.underline, mobile && styles.underlineFilled]} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, email && styles.inputFilled]}
            keyboardType="email-address"
          />
          <View style={styles.underlineContainer}>
            <View style={[styles.underline, email && styles.underlineFilled]} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, password && styles.inputFilled]}
          />
          <View style={styles.underlineContainer}>
            <View style={[styles.underline, password && styles.underlineFilled]} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B42F6',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backIcon: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Cochin',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#F3F1F1',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 5,
  },
  inputFilled: {
    color: '#333',
  },
  underlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  underlineFilled: {
    width: '100%',
    backgroundColor: '#000',
  },
  submitButton: {
    backgroundColor: '#D65DB1',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cochin',
  },
});

export default Profile;
