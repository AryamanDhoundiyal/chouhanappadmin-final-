import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const IconTextInput = ({ icon, placeholder, secureTextEntry, value, onChangeText, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Icon name={icon} size={20} color={value ? '#aaa' : '#ccc'} style={styles.icon} />
        <TextInput
          {...props}
          style={styles.input}
          placeholder={value ? '' : placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#aaa"
        />
      </View>
    </View>
  );
};

const AddEmployee = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [currency, setCurrency] = useState('');
  const [salaryType, setSalaryType] = useState('daily');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [workingHoursFrom, setWorkingHoursFrom] = useState('');
  const [workingHoursTo, setWorkingHoursTo] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSubmit = async () => {
    if (
      username &&
      name &&
      address &&
      dob &&
      mobile &&
      email &&
      password &&
      designation &&
      currency &&
      salaryAmount &&
      workingHoursFrom &&
      workingHoursTo &&
      salaryType
    ) {
      try {
        await axios.post(`${server_url}/AddEmployee`, {
          employee_username: username, // Make sure to use the correct field name
          employee_name: name,
          employee_address: address,
          date_of_birth: dob,
          mobile_no: mobile,
          email_address: email,
          password: password,
          designation: designation,
          currency_symbol: currency,
          current_salary: salaryAmount,
          working_hours_from: workingHoursFrom,
          working_hours_to: workingHoursTo,
          salary_type: salaryType,
        });
        Alert.alert('Success', 'Employee added successfully');
        setUsername('');
        setName('');
        setAddress('');
        setDob('');
        setMobile('');
        setEmail('');
        setPassword('');
        setDesignation('');
        setCurrency('');
        setSalaryAmount('');
        setWorkingHoursFrom('');
        setWorkingHoursTo('');
      } catch (error) {
        console.error(error); // Log the error for debugging
        Alert.alert('Error', 'Failed to add employee');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleProfileNavigation = () => {
    setMenuVisible(false);
    navigation.navigate('Profile');
  };

  const handleLogoutNavigation = () => {
    setMenuVisible(false);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Employee</Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.profileIcon}>
          <FontAwesome name="user-circle" size={20} color="black" />
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleProfileNavigation}>
              <Text style={styles.menuText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogoutNavigation}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <IconTextInput icon="person" placeholder="Enter username" value={username} onChangeText={setUsername} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Employee Name</Text>
            <IconTextInput icon="person" placeholder="Enter employee name" value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Employee Address</Text>
            <IconTextInput icon="home" placeholder="Enter employee address" value={address} onChangeText={setAddress} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <IconTextInput icon="calendar" placeholder="Enter date of birth" value={dob} onChangeText={setDob} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile No</Text>
            <IconTextInput icon="call" placeholder="Enter mobile number" value={mobile} onChangeText={setMobile} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <IconTextInput icon="mail" placeholder="Enter email address" value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <IconTextInput icon="lock-closed" placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Designation</Text>
            <IconTextInput icon="briefcase" placeholder="Enter designation" value={designation} onChangeText={setDesignation} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Currency Symbol</Text>
            <IconTextInput icon="cash" placeholder="Enter currency symbol" value={currency} onChangeText={setCurrency} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Salary Type</Text>
            <View style={styles.salaryContainer}>
              <TouchableOpacity
                style={[styles.salaryButton, salaryType === 'daily' && styles.selectedSalaryButton]}
                onPress={() => setSalaryType('daily')}
              >
                <Text style={styles.salaryButtonText}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.salaryButton, salaryType === 'Monthly' && styles.selectedSalaryButton]}
                onPress={() => setSalaryType('Monthly')}
              >
                <Text style={styles.salaryButtonText}>Monthly</Text>
              </TouchableOpacity>
            </View>
          </View>
          {(salaryType === 'daily' || salaryType === 'Monthly') && (
            <View style={styles.inputContainer}>
              <IconTextInput
                icon="cash"
                placeholder={salaryType === 'daily' ? 'Enter daily salary' : 'Enter monthly salary'}
                value={salaryAmount}
                onChangeText={setSalaryAmount}
                keyboardType="numeric"
              />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Working Hours</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>From</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Enter time"
                  value={workingHoursFrom}
                  onChangeText={setWorkingHoursFrom}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>To</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Enter time"
                  value={workingHoursTo}
                  onChangeText={setWorkingHoursTo}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#68689E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
    zIndex: 1, // Ensure the header stays on top
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  profileIcon: {
    position: 'relative',
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 40, // Adjust top position if needed
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 2, // Ensure the menu is on top of the white column
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    position: 'relative',
    zIndex: 0, // Ensure the form container is beneath the menu
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'normal',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 40, // Add padding to accommodate the icon
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  placeholder: {
    position: 'absolute',
    left: 40,
    top: 10,
    color: '#ccc',
    fontWeight: 'normal',
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalItem: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: 'black',
  },
  salaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  salaryButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedSalaryButton: {
    backgroundColor: '#d1e0e0',
  },
  salaryButtonText: {
    fontSize: 16,
    color: 'black',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeColumn: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  timePeriodButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  timePeriodText: {
    fontSize: 16,
    color: '#000',
  }, button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEmployee;