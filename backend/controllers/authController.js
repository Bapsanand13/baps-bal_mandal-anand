import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, age, guardianName, mandal } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      guardianName,
      mandal
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age,
        guardianName: user.guardianName,
        mandal: user.mandal
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);
    console.log('Env ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    console.log('Env ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);

    // Check if user exists in DB
    let user = await User.findOne({ email });
    if (!user) {
      console.log('No user found in DB, checking env admin...');
      if (
        process.env.ADMIN_EMAIL &&
        process.env.ADMIN_PASSWORD &&
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        console.log('Env admin credentials matched!');
        // Return a fake user object for admin
        const adminUser = {
          _id: 'env-admin',
          name: 'Super Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'superadmin',
        };
        const token = jwt.sign(
          { userId: adminUser._id, role: adminUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        return res.json({
          message: 'Login successful',
          token,
          user: adminUser
        });
      }
      console.log('Env admin credentials did NOT match.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password did not match for DB user.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age: user.age,
        guardianName: user.guardianName,
        mandal: user.mandal
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    console.log('getMe: req.user =', req.user);
    if (req.user.userId === 'env-admin') {
      // Return env-admin user object
      return res.json({
        _id: 'env-admin',
        name: 'Super Admin',
        email: process.env.ADMIN_EMAIL,
        role: 'superadmin',
      });
    }
    const user = await User.findById(req.user.userId).select('-password');
    console.log('getMe: found user =', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 