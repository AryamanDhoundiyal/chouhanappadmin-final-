import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const PayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const employeeUsername = route.params?.employeeUsername;
        if (!employeeUsername) {
          Alert.alert('Error', 'Employee username is missing from route params');
          navigation.goBack(); // Navigate back or handle appropriately
          setLoading(false);
          return;
        }

        // Fetch employee details from the API
        const response = await axios.get(`${server_url}/Page/${employeeUsername}`);
        const employeeDetails = response.data;

        if (!Array.isArray(employeeDetails)) {
          Alert.alert('Error', 'Unexpected data format');
          setLoading(false);
          return;
        }

        // Update state with fetched data
        setData(employeeDetails.map(detail => {
          const totalSalary = parseFloat(detail.total_salary) || 0;
          const totalAdvances = parseFloat(detail.advance_taken_amount) || 0;
          const totalBonuses = parseFloat(detail.bonus_amount) || 0;
          const finalSalary = totalSalary - totalAdvances - totalBonuses;

          return {
            id: detail.id.toString(),
            advance: detail.advance_taken_amount || 'N/A',
            advanceReason: detail.advance_reason || 'N/A',
            bonus: detail.bonus_amount || 'N/A',
            bonusReason: detail.bonus_reason || 'N/A',
            date: detail.advance_taken_date || detail.bonus_date || 'N/A',
            totalSalary: totalSalary.toFixed(2),
            finalSalary: finalSalary.toFixed(2),
          };
        }));

        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch employee details');
        console.error('Error fetching employee details:', error); // Log error for debugging
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [route.params?.employeeUsername]);

  const onClose = () => {
    navigation.navigate('Salary', { employeeUsername: route.params?.employeeUsername });
  };

  const onConfirm = () => {
    navigation.navigate('ConfirmedEmployee', { employeeUsername: route.params?.employeeUsername });
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.advance}</Text>
      <Text style={styles.tableCell}>{item.advanceReason}</Text>
      <Text style={styles.tableCell}>{item.bonus}</Text>
      <Text style={styles.tableCell}>{item.bonusReason}</Text>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.totalSalary}</Text>
      <Text style={styles.tableCell}>{item.finalSalary}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ListEmp')}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payButton} onPress={onClose}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Advance</Text>
          <Text style={styles.tableHeaderCell}>Advance Reason</Text>
          <Text style={styles.tableHeaderCell}>Bonus</Text>
          <Text style={styles.tableHeaderCell}>Bonus Reason</Text>
          <Text style={styles.tableHeaderCell}>Date</Text>
          <Text style={styles.tableHeaderCell}>Total Salary</Text>
          <Text style={styles.tableHeaderCell}>Final Salary</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  payButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: '#ffc107',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  table: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default PayScreen;
