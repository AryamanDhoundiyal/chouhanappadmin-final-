import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { server_url } from '../config';

const NoticeDetailsScreen = () => {
  const [confirmations, setConfirmations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the useRoute hook to access route params
  const route = useRoute();
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const { noticeId } = route.params || {}; // Fallback to an empty object if route.params is undefined

  useEffect(() => {
    if (!noticeId) {
      setError('No notice ID provided');
      setLoading(false);
      return;
    }

    const fetchConfirmations = async () => {
      try {
        const response = await axios.get(`${server_url}/NoticeDetailsScreen/${noticeId}`);
        setConfirmations(response.data);
      } catch (error) {
        let errorMessage = 'Failed to fetch confirmations';
        if (error.response) {
          errorMessage += `: ${error.response.status} ${error.response.statusText}`;
        } else if (error.request) {
          errorMessage += ': No response received from server';
        } else {
          errorMessage += `: ${error.message}`;
        }
        setError(errorMessage);
        console.error('Failed to fetch confirmations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmations();
  }, [noticeId]);

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Text style={styles.iconText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Confirmations for Notice {noticeId}</Text>
        <View style={styles.addIcon} />
      </View>
      <ScrollView style={styles.noticeList}>
        {confirmations.length === 0 ? (
          <Text style={styles.emptyText}>No confirmations available.</Text>
        ) : (
          confirmations.map((confirmation) => (
            <View key={`${confirmation.notice_id}-${confirmation.employee_username}`} style={styles.noticeItem}>
              <Text style={styles.noticeText}>
                {confirmation.employee_username}
              </Text>
              <Text style={styles.timestamp}>
                {new Date(confirmation.confirmed_at).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Notice')} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B42F6', // Main background color
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backIcon: {
    padding: 10,
  },
  title: {
    color: '#fff', // Title color
    fontSize: 24,
    justifyContent: 'center',
  },
  noticeList: {
    width: '90%',
    marginTop: 20,
  },
  noticeItem: {
    backgroundColor: '#fff', // Notice item background color
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  noticeText: {
    fontSize: 16,
    color: '#333', // Notice text color
  },
  timestamp: {
    fontSize: 12,
    color: '#666', // Timestamp color
    marginTop: 5,
  },
  username: {
    fontSize: 14,
    color: '#555', // Username color
    marginTop: 5,
  },
  addIcon: {
    padding: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7B42F6', // Close button background color
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff', // Close button text color
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  iconText: {
    color: '#7B42F6', // Color for icons/text in header
  },
});

export default NoticeDetailsScreen;
