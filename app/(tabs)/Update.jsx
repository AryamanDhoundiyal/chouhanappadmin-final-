import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { server_url } from '../config';

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
          value={value ?? ''} // Ensure value is never undefined
          placeholderTextColor="#aaa"
        />
      </View>
    </View>
  );
};

const AddEmployee = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { employeeId } = route.params;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [designation, setDesignation] = useState('');
  const [currency, setCurrency] = useState('');
  const [salaryType, setSalaryType] = useState('daily');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [workingHoursFrom, setWorkingHoursFrom] = useState('');
  const [workingHoursTo, setWorkingHoursTo] = useState('');
  const [menuVisible, setMenuVisible] = useState(false); // Initialize menuVisible state

  useEffect(() => {
    if (employeeId) {
      axios.get(`${server_url}/Update/${employeeId}`)
        .then(response => {
          const data = response.data;
          setName(data.employee_name ?? '');
          setUsername(data.employee_username ?? '');
          setAddress(data.employee_address ?? '');
          setDob(formatDate(data.date_of_birth) ?? ''); // Format the date
          setMobile(data.mobile_no ?? '');
          setEmail(data.email_address ?? '');
          setPassword(data.password ?? '');
          setDesignation(data.designation ?? '');
          setCurrency(data.currency_symbol ?? '');
          setSalaryType(data.salary_type?.toLowerCase() ?? 'daily');
          setSalaryAmount(data.current_salary?.toString() ?? '');
          setWorkingHoursFrom(data.working_hours_from ?? '');
          setWorkingHoursTo(data.working_hours_to ?? '');
        })
        .catch(error => {
          Alert.alert('Error', 'Failed to fetch employee data');
          console.error('Error fetching employee data:', error);
        });
    }
  }, [employeeId]);

  const handleSubmit = () => {
    if (name && address && dob && mobile && email && password && designation && currency && salaryAmount && workingHoursFrom && workingHoursTo && username) {
      axios.put(`https://cb-1-ajy0.onrender.com/Update/${employeeId}`, {
        employee_name: name,
        employee_username: username,
        employee_address: address,
        date_of_birth: dob,
        mobile_no: mobile,
        email_address: email,
        password: password,
        designation: designation,
        currency_symbol: currency,
        salary_type: salaryType,
        current_salary: salaryAmount,
        working_hours_from: workingHoursFrom,
        working_hours_to: workingHoursTo,
      })
      .then(response => {
        Alert.alert('Success', 'Employee updated successfully');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to update employee data');
        console.error('Error updating employee data:', error);
      });
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Icon name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Update Information</Text>
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          style={styles.profileIcon}
        >
          <FontAwesome name="user-circle" size={20} color="white" />
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
            <Text style={styles.label}>Employee Name</Text>
            <IconTextInput icon="person" placeholder="Enter employee name" value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <IconTextInput icon="person" placeholder="Enter username" value={username} onChangeText={setUsername} />
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
            <IconTextInput
              icon={passwordVisible ? "eye" : "eye-off"}
              placeholder="Enter password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordVisibility}>
              <Text>{passwordVisible ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Designation</Text>
            <IconTextInput icon="briefcase" placeholder="Enter designation" value={designation} onChangeText={setDesignation} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Currency Symbol</Text>
            <IconTextInput icon="cash" placeholder="Enter currency symbol" value={currency} onChangeText={setCurrency} />
          </View>
          <View style={styles.salaryContainer}>
            <TouchableOpacity
              style={[styles.salaryButton, salaryType === 'daily' && styles.selectedSalaryButton]}
              onPress={() => setSalaryType('daily')}
            >
              <Text style={styles.salaryButtonText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.salaryButton, salaryType === 'monthly' && styles.selectedSalaryButton]}
              onPress={() => setSalaryType('monthly')}
            >
              <Text style={styles.salaryButtonText}>Monthly</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Salary Amount</Text>
            <IconTextInput icon="cash" placeholder="Enter salary amount" value={salaryAmount} onChangeText={setSalaryAmount} keyboardType="numeric" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Working Hours (From)</Text>
            <IconTextInput icon="time" placeholder="Start time" value={workingHoursFrom} onChangeText={setWorkingHoursFrom} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Working Hours (To)</Text>
            <IconTextInput icon="time" placeholder="End time" value={workingHoursTo} onChangeText={setWorkingHoursTo} />
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  togglePasswordVisibility: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  salaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  salaryButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  selectedSalaryButton: {
    backgroundColor: '#68689E',
  },
  salaryButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButtonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default AddEmployee;
