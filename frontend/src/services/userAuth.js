import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance for user authentication
const userApi = axios.create({
  baseURL: `${baseURL}/user-auth`
});

// Add token to requests
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Registration function
export const registerUser = async (userData) => {
  try {
    const response = await userApi.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Login function
export const loginUser = async (credentials) => {
  try {
    const response = await userApi.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem('user-token');
};

// Get current user
export const getCurrentUser = () => {
  const token = localStorage.getItem('user-token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};