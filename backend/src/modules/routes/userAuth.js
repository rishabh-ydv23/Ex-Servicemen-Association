import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, dateOfBirth, serviceDetails } = req.body || {};
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create user with password
    const userData = { name, email, phone, address, dateOfBirth, serviceDetails };
    const user = await User.createWithPassword(userData, password);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: 'user' },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        membershipStatus: user.membershipStatus,
        dateOfBirth: user.dateOfBirth,
        serviceDetails: user.serviceDetails
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: 'user' },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        membershipStatus: user.membershipStatus,
        dateOfBirth: user.dateOfBirth,
        serviceDetails: user.serviceDetails
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;