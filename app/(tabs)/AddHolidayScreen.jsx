import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { server_url } from '../config';

const AddHolidayScreen = () => {
  const [holidayName, setHolidayName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  const handleAddHoliday = async () => {
    if (!holidayName || !selectedDate) {
      alert('Please fill out both fields');
      return;
    }

    try {
      await axios.post(`${server_url}/AddHolidayScreen`, {
        holiday_name: holidayName,
        holiday_date: selectedDate
      });
      alert('Holiday added successfully');
      navigation.navigate('CBbuilder'); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error adding holiday:', error);
      alert('Failed to add holiday');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('HolidayList')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Add New Holiday</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Holiday Name"
        placeholderTextColor="#ccc"
        value={holidayName}
        onChangeText={setHolidayName}
      />
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
        />
        <Text style={styles.dateText}>Selected Date: {selectedDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add Holiday" onPress={handleAddHoliday} color="#68689E" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#68689E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    color: '#000',
  },
  calendarContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddHolidayScreen;
