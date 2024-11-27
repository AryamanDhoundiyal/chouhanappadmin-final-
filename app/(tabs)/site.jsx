import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const SiteBoard = () => {
  const navigation = useNavigation();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = useCallback(async () => {
    try {
      const response = await axios.get(`${server_url}/site`);
      setSites(response.data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server_url}/site/${id}`);
      setSites(sites.filter(site => site.id !== id));
      Alert.alert('Success', 'Site deleted successfully');
    } catch (error) {
      console.error('Error deleting site:', error);
      Alert.alert('Error', 'Failed to delete site');
    }
  };

  const handleAdd = () => {
    navigation.navigate('addsite');
  };

  const renderItem = ({ item }) => (
    <View style={styles.siteItem}>
      <Text style={styles.siteName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CBbuilder')}>
          <Icon name="arrow-left" size={24} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Available Sites</Text>
      </View>

      <FlatList
        data={sites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B42F6',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backIcon: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Cochin',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#D65DB1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cochin',
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  list: {
    width: '100%',
  },
  siteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  siteName: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SiteBoard;
