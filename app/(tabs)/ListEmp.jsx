import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const EmployeeList = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the API
    axios.get(`${server_url}/ListEmp`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        Alert.alert('Error', 'Could not fetch employees.');
      });
  }, []);

  const handleEmployeePress = (employee) => {
    // Navigate to ViewAtt with employee username
    navigation.navigate('Page', { employeeUsername: employee.employee_username });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleEmployeePress(item)}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722729600&semt=sph' }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.employee_username}</Text>
        <Text style={styles.position}>{item.designation}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("CBbuilder")} style={styles.arrow}>
          <View style={styles.triangle} />
        </TouchableOpacity>
        <Text style={styles.heading}>List of Employees</Text>
      </View>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.employee_id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68689E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrow: {
    marginRight: 15,
  },
  leftTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    color: '#555',
  },
  triangleContainer: {
    padding: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'black',
  },
});

export default EmployeeList;
