import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const EmployeeList = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [advanceReason, setAdvanceReason] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [hasAdvance, setHasAdvance] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${server_url}/List`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeePress = (employee) => {
    navigation.navigate('Update', { employeeId: employee.employee_id });
  };

  const saveChanges = () => {
    if (selectedEmployee) {
      const updatedEmployees = employees.map(emp => 
        emp.employee_id === selectedEmployee.employee_id ? {
          ...selectedEmployee,
          advanceReason: hasAdvance ? advanceReason : '',
          advanceAmount: hasAdvance ? parseFloat(advanceAmount) : 0,
          monthlySalary: parseFloat(monthlySalary),
          hasAdvance: hasAdvance && parseFloat(advanceAmount) > 0
        } : emp
      );
      setEmployees(updatedEmployees);
      setSelectedEmployee(null);
      setModalVisible(false);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`https://cb-1-ajy0.onrender.com/List/${employeeId}`);
      setEmployees(employees.filter(emp => emp.employee_id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item} onPress={() => handleEmployeePress(item)}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722729600&semt=sph' }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.employee_name}</Text>
          <Text style={styles.position}>{item.designation}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteEmployee(item.employee_id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')} style={styles.arrow}>
          <View style={styles.triangle} />
        </TouchableOpacity>
        <Text style={styles.heading}>View Employees</Text>
      </View>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.employee_id.toString()}
      />
      {selectedEmployee && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Receipt</Text>
              {isAdmin ? (
                <>
                  <View style={styles.switchContainer}>
                    <Text>Has Advance: </Text>
                    <Switch
                      value={hasAdvance}
                      onValueChange={(value) => setHasAdvance(value)}
                    />
                  </View>
                  {hasAdvance && (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Advance Reason"
                        value={advanceReason}
                        onChangeText={setAdvanceReason}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Advance Amount"
                        keyboardType="numeric"
                        value={advanceAmount}
                        onChangeText={setAdvanceAmount}
                      />
                    </>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Monthly Salary"
                    keyboardType="numeric"
                    value={monthlySalary}
                    onChangeText={setMonthlySalary}
                  />
                  <View style={styles.grid}>
                    {hasAdvance && (
                      <>
                        <View style={styles.row}>
                          <Text style={styles.gridLabel}>Advance Reason:</Text>
                          <Text style={styles.gridValue}>{advanceReason}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.gridLabel}>Advance Amount:</Text>
                          <Text style={styles.gridValue}>${advanceAmount}</Text>
                        </View>
                      </>
                    )}
                    <View style={styles.row}>
                      <Text style={styles.gridLabel}>Monthly Salary:</Text>
                      <Text style={styles.gridValue}>${monthlySalary}</Text>
                    </View>
                    {hasAdvance && (
                      <View style={styles.row}>
                        <Text style={styles.gridLabel}>Reduced Salary:</Text>
                        <Text style={styles.gridValue}>${parseFloat(monthlySalary) - parseFloat(advanceAmount)}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button title="Save Changes" onPress={saveChanges} />
                    <View style={styles.buttonGap} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                  </View>
                </>
              ) : (
                <View style={styles.grid}>
                  {hasAdvance && (
                    <>
                      <View style={styles.row}>
                        <Text style={styles.gridLabel}>Advance Reason:</Text>
                        <Text style={styles.gridValue}>{advanceReason}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.gridLabel}>Advance Amount:</Text>
                        <Text style={styles.gridValue}>${advanceAmount}</Text>
                      </View>
                    </>
                  )}
                  <View style={styles.row}>
                    <Text style={styles.gridLabel}>Monthly Salary:</Text>
                    <Text style={styles.gridValue}>${monthlySalary}</Text>
                  </View>
                  {hasAdvance && (
                    <View style={styles.row}>
                      <Text style={styles.gridLabel}>Reduced Salary:</Text>
                      <Text style={styles.gridValue}>${parseFloat(monthlySalary) - parseFloat(advanceAmount)}</Text>
                    </View>
                  )}
                  <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
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
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'white',
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#D9DBE1',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  grid: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  gridLabel: {
    fontWeight: 'bold',
  },
  gridValue: {
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGap: {
    width: 10,
  },
});

export default EmployeeList;
