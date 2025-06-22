import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5174'
  },

  // Database configuration
  database: {
    uri: process.env.MONGO_URI,
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
    refreshExpiresIn: '30d'
  },

  // Cloudinary configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },

  // File upload configuration
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    uploadPath: './uploads'
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logToFile: process.env.LOG_TO_FILE === 'true',
    logDir: './logs'
  },

  // Email configuration (optional)
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    secure: process.env.SMTP_SECURE === 'true'
  },

  // Security configuration
  security: {
    bcryptRounds: 10,
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5174']
  }
};

// Validation function to check required environment variables
export const validateConfig = () => {
  const required = [
    'MONGO_URI',
    'JWT_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    // Don't throw error on Vercel, just log it
    if (process.env.VERCEL) {
      console.warn('Running on Vercel with missing environment variables. Some features may not work.');
      return false;
    } else {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
  
  return true;
};

// Get configuration for specific environment
export const getConfig = (key) => {
  const keys = key.split('.');
  let value = config;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  
  return value;
};

export default config; 