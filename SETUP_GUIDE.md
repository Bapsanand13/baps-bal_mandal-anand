# 🚀 BAPS Bal Mandal - Setup Guide

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd "BAPS Bal Mandal"

# Install all dependencies (root, backend, frontend, admin)
npm run install:all
```

### 2. Environment Setup

#### Backend Environment
```bash
# Copy the example environment file
cp backend/env.example backend/.env

# Edit the .env file with your values
# Required variables:
# - MONGO_URI (MongoDB connection string)
# - JWT_SECRET (any secure random string)
```

#### Frontend Environment
```bash
# Copy the example environment file
cp frontend/env.example frontend/.env

# Edit the .env file with your API URL
# VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# The backend will automatically create the database
```

#### Option B: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `backend/.env`

### 4. Start Development Servers

#### Option A: Using npm (Unix/Mac/Linux)
```bash
npm run dev
```

#### Option B: Using PowerShell (Windows)
```powershell
.\dev.ps1
```

#### Option C: Using Batch File (Windows)
```cmd
dev.bat
```

#### Option D: Manual Start
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev

# Terminal 3 - Admin
cd admin && npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5174

## Environment Variables

### Backend (.env)
```env
# Required
MONGO_URI=mongodb://localhost:27017/baps-bal-mandal
JWT_SECRET=your-super-secret-jwt-key

# Optional
NODE_ENV=development
PORT=5000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)
```env
# Required
VITE_API_BASE_URL=http://localhost:5000/api

# Optional
VITE_APP_NAME=BAPS Bal Mandal
VITE_APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

#### 1. "concurrently is not recognized"
```bash
npm install
```

#### 2. "No token provided" error
- Make sure you're logged in
- Check if JWT_SECRET is set in backend/.env
- Clear browser localStorage and login again

#### 3. Database connection failed
- Check if MongoDB is running
- Verify MONGO_URI in backend/.env
- For Atlas: Check network access and credentials

#### 4. Port already in use
- Kill existing processes: `npx kill-port 5000 5173 5174`
- Or change ports in respective .env files

#### 5. PowerShell "&&" error
- Use the provided PowerShell script: `.\dev.ps1`
- Or use the batch file: `dev.bat`
- Or run servers manually in separate terminals

### Development Commands

```bash
# Install dependencies
npm run install:all

# Start all servers
npm run dev

# Start individual servers
npm run dev:backend
npm run dev:frontend
npm run dev:admin

# Build for production
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build files
npm run clean
```

## Project Structure

```
BAPS Bal Mandal/
├── backend/          # Express.js API server
├── frontend/         # React.js main application
├── admin/           # React.js admin panel
├── .github/         # GitHub Actions workflows
├── dev.ps1          # PowerShell development script
├── dev.bat          # Batch development script
└── package.json     # Root package.json
```

## Deployment

### Vercel Deployment
See: `backend/VERCEL_DEPLOYMENT.md`

### Render Deployment  
See: `RENDER_DEPLOYMENT.md`

## Support

If you encounter any issues:
1. Check this setup guide
2. Review the troubleshooting section
3. Check the deployment guides
4. Create an issue in the repository 