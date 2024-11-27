import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon component
import axios from 'axios';
import { server_url } from '../config';

const AddNoticeScreen = () => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleSend = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(`${server_url}/AddNoticeScreen`, { text: message });
        const newNotice = {
          id: response.data.id,
          text: message,
          timestamp: new Date().toLocaleString(),
        };
        // Assuming you have some context or prop to handle the new notice
        // onAddNotice(newNotice);
        navigation.navigate('CBbuilder');
      } catch (error) {
        Alert.alert('Error', 'Failed to add notice. Please try again.');
      }
    } else {
      Alert.alert('Empty Notice', 'Please write a notice before sending.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Notice')}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TextInput 
        style={styles.input}
        multiline
        value={message}
        onChangeText={setMessage}
        placeholder="Write your notice here..."
        placeholderTextColor="#555"
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
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
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  input: {
    backgroundColor: '#F3F1F1',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    height: '40%',
    fontSize: 22,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 20,
    marginTop: 50, // Adjust the margin to avoid overlap with the icon
  },
  sendButton: {
    backgroundColor: '#D65DB1',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddNoticeScreen;
