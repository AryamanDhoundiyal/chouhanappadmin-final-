import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { server_url } from '../config';

const EmployeeLeaveScreen = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch leave applications data from API
    axios.get(`${server_url}/Leave`)
      .then(response => {
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const openApplication = (application) => {
    setSelectedApplication(application);
    setModalVisible(true);
  };

  const closeApplication = () => {
    setModalVisible(false);
    setSelectedApplication(null);
  };

  const handleAction = (type) => {
    setActionType(type);
    setConfirmationModalVisible(true);
  };

  const confirmAction = () => {
    // Handle approve or not approve logic here
    setConfirmationModalVisible(false);
    setModalVisible(false);
    setSelectedApplication(null);
  };

  const cancelAction = () => {
    setConfirmationModalVisible(false);
  };

  const navigateToCBbuilder = () => {
    navigation.navigate('CBbuilder');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigateToCBbuilder} style={styles.arrowButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Employee Leave Applications</Text>
      </View>
      <ScrollView>
        {employeeData.map((employee) => (
          <View key={employee.application_id} style={styles.employeeContainer}>
            <TouchableOpacity onPress={() => openApplication(employee)}>
              <View style={styles.employeeInfo}>
                <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.photo} />
                <Text style={styles.employeeName}>{employee.employee_username}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedApplication && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeApplication}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{selectedApplication.employee_username}'s Leave Application</Text>
            <ScrollView style={styles.applicationContent}>
              <Text style={styles.applicationText}>{selectedApplication.reason}</Text>
              {selectedApplication.attachment_file && (
                <Image source={{ uri: `data:image/jpeg;base64,${selectedApplication.attachment_file}` }} style={styles.documentImage} />
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleAction('approve')} style={styles.approveButton}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction('notApprove')} style={styles.notApproveButton}>
                <Text style={styles.buttonText}>Not Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {confirmationModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmationModalVisible}
          onRequestClose={cancelAction}
        >
          <View style={styles.confirmationModalView}>
            <Text style={styles.confirmationText}>
              Are you sure you want to {actionType === 'approve' ? 'approve' : 'not approve'} this leave application?
            </Text>
            <View style={styles.confirmationButtonContainer}>
              <TouchableOpacity onPress={confirmAction} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAction} style={styles.cancelButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
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
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  arrowButton: {
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  employeeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  employeeName: {
    fontSize: 16,
    flex: 1,
    color: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  applicationContent: {
    width: '100%',
  },
  applicationText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  documentImage: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  notApproveButton: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  confirmationModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmationButtonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
});

export default EmployeeLeaveScreen;
