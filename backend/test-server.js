import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true 
}));
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'BAPS Bal Mandal API is running 🚀',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Test authentication routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, age, parentName, parentPhone } = req.body;
  
  // Simulate user registration
  const mockUser = {
    id: '123456789',
    name,
    email,
    phone,
    age,
    parentName,
    parentPhone,
    role: 'user'
  };

  const mockToken = 'mock-jwt-token-' + Date.now();

  res.status(201).json({
    message: 'User registered successfully',
    token: mockToken,
    user: mockUser
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulate user login
  const mockUser = {
    id: '123456789',
    name: 'Test User',
    email,
    phone: '+1234567890',
    age: 12,
    parentName: 'Test Parent',
    parentPhone: '+1234567890',
    role: 'user'
  };

  const mockToken = 'mock-jwt-token-' + Date.now();

  res.json({
    message: 'Login successful',
    token: mockToken,
    user: mockUser
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Simulate user data
  const mockUser = {
    id: '123456789',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    age: 12,
    parentName: 'Test Parent',
    parentPhone: '+1234567890',
    role: 'user'
  };

  res.json(mockUser);
});

// Test events routes
app.get('/api/events', (req, res) => {
  const mockEvents = [
    {
      id: '1',
      title: 'Bal Sabha',
      description: 'Weekly spiritual gathering for children',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'BAPS Temple',
      category: 'spiritual',
      maxAttendees: 50,
      attendees: [],
      organizer: { name: 'Admin' }
    },
    {
      id: '2',
      title: 'Art & Craft Workshop',
      description: 'Creative activities for children',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Community Hall',
      category: 'activity',
      maxAttendees: 30,
      attendees: [],
      organizer: { name: 'Admin' }
    }
  ];

  res.json(mockEvents);
});

// Test posts routes
app.get('/api/posts', (req, res) => {
  const mockPosts = [
    {
      id: '1',
      title: 'Welcome to BAPS Bal Mandal',
      content: 'Welcome all children to our spiritual community!',
      category: 'announcement',
      author: { name: 'Admin' },
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    }
  ];

  res.json(mockPosts);
});

// Test notifications routes
app.get('/api/notifications', (req, res) => {
  const mockNotifications = [
    {
      id: '1',
      title: 'Welcome!',
      message: 'Welcome to BAPS Bal Mandal community',
      type: 'announcement',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ];

  res.json(mockNotifications);
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check at http://localhost:${PORT}/`);
}); 