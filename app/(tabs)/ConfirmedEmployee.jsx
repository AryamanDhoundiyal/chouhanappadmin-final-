import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const ConfirmedEmployeeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfirmedSalaryDetails = async () => {
      try {
        const employeeUsername = route.params?.employeeUsername;
        if (!employeeUsername) {
          Alert.alert('Error', 'Employee username is missing from route params');
          navigation.goBack();
          setLoading(false);
          return;
        }

        const response = await axios.get(`${server_url}/${employeeUsername}`);
        const salaryDetails = response.data;

        if (!salaryDetails || salaryDetails.length === 0) {
          Alert.alert('Error', 'No confirmed salary data found');
          setLoading(false);
          return;
        }

        setData(salaryDetails);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch confirmed salary details');
        console.error('Error fetching confirmed salary details:', error);
        setLoading(false);
      }
    };

    fetchConfirmedSalaryDetails();

    // Set up custom back button
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'Confirmed Salary Details',
    });
  }, [route.params?.employeeUsername, navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.header}>Confirmed Salary Details</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Total Salary</Text>
          <Text style={styles.tableCell}>{item.total_salary}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Advance Taken</Text>
          <Text style={styles.tableCell}>{item.advance_taken_amount || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Advance Date</Text>
          <Text style={styles.tableCell}>{item.advance_taken_date || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Advance Reason</Text>
          <Text style={styles.tableCell}>{item.advance_reason || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Bonus Amount</Text>
          <Text style={styles.tableCell}>{item.bonus_amount || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Bonus Date</Text>
          <Text style={styles.tableCell}>{item.bonus_date || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Bonus Reason</Text>
          <Text style={styles.tableCell}>{item.bonus_reason || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Final Salary</Text>
          <Text style={styles.tableCell}>{item.final_salary}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listContainer: {
    paddingBottom: 16,
  },
  backButton: {
    padding: 10,
  },
});

export default ConfirmedEmployeeScreen;
