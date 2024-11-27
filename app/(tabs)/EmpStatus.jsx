import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { server_url } from '../config';

const EmployeeStatusScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch employees who are present today
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${server_url}/EmpStatus`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Function to render each employee card
  const renderEmployeeCard = ({ item }) => (
    <View style={styles.employeeCard}>
      <Image
        source={{ uri: item.employee_photo }}
        style={styles.profileImage}
      />
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.employee_username}</Text>
            <Text style={styles.attendanceText}>Time: {item.attendance_time}</Text>
            <Text style={styles.cityText}>City: {item.city}</Text> {/* Display city */}
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.callText}>Make call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Employees</Text>
        <Icon name="search" type="material" color="black" />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>14 Aug, 2024</Text>
        <Icon name="calendar-today" type="material" color="black" />
      </View>
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>{employees.length} Employees</Text>
        <View style={styles.statusDetail}>
          <View style={styles.statusBox}>
            <Text style={styles.checkedInText}>{employees.length} Checked in</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={employees}
        renderItem={renderEmployeeCard}
        keyExtractor={item => item.id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  checkedInText: {
    color: 'green',
    fontWeight: 'bold',
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendanceText: {
    fontSize: 14,
    color: 'red',
    marginTop: 2,
  },
  cityText: {
    fontSize: 14,
    color: 'blue',
    marginTop: 2,
  },
  callText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EmployeeStatusScreen;
