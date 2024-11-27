import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const AdminNoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${server_url}/Notice`);
        setNotices(response.data);
      } catch (error) {
        console.error('Failed to fetch notices', error);
      }
    };

    fetchNotices();
  }, []);

  const handleAddNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
  };

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`${server_url}/Notice/${id}`);
      setNotices(notices.filter(notice => notice.id !== id));
    } catch (error) {
      console.error('Failed to delete notice', error);
    }
  };

  const handleShowConfirmations = (noticeId) => {
    if (!noticeId) {
      console.error('No notice ID provided');
      return;
    }
    navigation.navigate('NoticeDetailsScreen', { noticeId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-left" size={24} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Notice Board</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddNoticeScreen', { onAddNotice: handleAddNotice })}>
          <Icon name="plus" size={24} color="black" style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.noticeList}>
        {notices.map(notice => (
          <View key={notice.id} style={styles.noticeItem}>
            <TouchableOpacity onPress={() => handleShowConfirmations(notice.id)}>
              <View>
                <Text style={styles.noticeText}>{notice.text}</Text>
                <Text style={styles.timestamp}>{new Date(notice.timestamp).toLocaleString()}</Text>
                {notice.employee_username && (
                  <Text style={styles.username}>Confirmed by: {notice.employee_username}</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNotice(notice.id)}>
              <Icon name="trash" size={24} color="#D65DB1" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B42F6',
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
    color: '#fff',
    fontSize: 24,
    justifyContent: 'center',
  },
  noticeList: {
    width: '90%',
    marginTop: 20,
  },
  noticeItem: {
    backgroundColor: '#fff',
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
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  username: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  addIcon: {
    padding: 10,
  },
});

export default AdminNoticeBoard;
