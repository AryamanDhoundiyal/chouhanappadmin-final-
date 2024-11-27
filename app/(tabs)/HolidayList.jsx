// HolidayList.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { server_url } from '../config';
import axios from 'axios';

const HolidayList = () => {
  const navigation = useNavigation();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${server_url}/HolidayList`);
      console.log('Holidays data:', response.data); // Check data structure
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setError('Error fetching holidays. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Public Holidays</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddHolidayScreen')}>
          <Icon name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {holidays.length === 0 ? (
        <Text style={styles.emptyState}>No holidays available</Text>
      ) : (
        <FlatList
          data={holidays}
          keyExtractor={(item) => item.holiday_id ? item.holiday_id.toString() : `unknown_${Math.random()}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemName}>{item.holiday_name}</Text>
              <Text style={styles.itemDate}>{item.holiday_date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#68689E', // Original background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#484D8B', // Slightly different shade for the header
    borderRadius: 10,
    elevation: 5, // Shadow for slight elevation effect
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
  },
  addButton: {
    padding: 10,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDate: {
    fontSize: 16,
    color: '#555',
  },
  emptyState: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HolidayList;
