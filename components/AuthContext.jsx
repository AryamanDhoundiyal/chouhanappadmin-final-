import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        
        if (token) {
          console.log('Token found:', token); // Logs if a token is found
          setIsAuthenticated(true); // Set authentication status to true
        } else {
          console.log('No token found'); // Logs if no token is found
          setIsAuthenticated(false); // Set authentication status to false
        }
      } catch (error) {
        console.error('Error checking authentication:', error); // Logs errors during token retrieval
      } finally {
        setLoading(false); // Always stop loading, whether or not token is found
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!loading && children} {/* Render children once loading is complete */}
    </AuthContext.Provider>
  );
};