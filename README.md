# BAPS Bal Mandal - Community Platform

A comprehensive MERN stack application for managing BAPS Bal Mandal community activities, events, and member interactions.

## 🏗️ Project Structure

This project consists of three main components:

- **Backend** (`/backend`) - Node.js/Express API server
- **Frontend** (`/frontend`) - React user interface for community members
- **Admin** (`/admin`) - React admin dashboard for administrators

## 🚀 Features

### For Community Members (Frontend)
- User authentication and profile management
- View and participate in community events
- Read community posts and announcements
- Receive notifications
- Install PWA for mobile access

### For Administrators (Admin Dashboard)
- Manage community events
- Create and manage posts
- User management
- Send notifications
- Analytics and reporting

### Backend API
- RESTful API with JWT authentication
- File upload support (Cloudinary)
- Rate limiting and security features
- MongoDB database integration
- Comprehensive error handling and logging

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for file uploads
- **Multer** for file handling
- **bcryptjs** for password hashing
- **Helmet** and other security middleware

### Frontend & Admin
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Icons** and **Lucide React** for icons
- **Headless UI** for accessible components

## 📦 Installation

### Prerequisites
- Node.js (>= 16.0.0)
- npm (>= 8.0.0)
- MongoDB database

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Configure your .env file with database and other settings
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Admin Setup
```bash
cd admin
npm install
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

### Alternative Deployment Options
- **Frontend/Admin**: Netlify, Vercel, or any static hosting
- **Backend**: Vercel Functions, Railway, or Heroku

## 📱 PWA Features

The frontend includes Progressive Web App (PWA) capabilities:
- Offline functionality
- Installable on mobile devices
- Push notifications
- Responsive design

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- XSS protection
- MongoDB query sanitization
- Helmet security headers

## 📊 API Documentation

The backend provides RESTful APIs for:
- User authentication and management
- Event management
- Post creation and management
- Notification system
- File uploads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

BAPS Bal Mandal Development Team

## 📞 Support

For support and questions, please contact the development team.

## 🔗 Quick Links

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md) #   b a p s - b a l _ m a n d a l - a n a n d 
 
 