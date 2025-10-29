import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    // You might want to fetch the user data here and set it to currentUser
  };

  const register = async (username, email, password) => {
    const res = await axios.post('/api/auth/register', { username, email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    // You might want to fetch the user data here and set it to currentUser
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};