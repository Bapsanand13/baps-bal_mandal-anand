import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import config, { validateConfig } from './config.js';

// Global connection cache for serverless
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Database connection function
export const connectDB = async () => {
  try {
    // Validate required environment variables
    const isValid = validateConfig();
    
    if (!isValid && process.env.VERCEL) {
      console.warn('Database connection skipped due to missing environment variables on Vercel');
      return null;
    }
    
    const MONGO_URI = config.database.uri;
    const connectOptions = config.database.options;

    if (!MONGO_URI) {
      console.error('MONGO_URI is not defined');
      if (process.env.VERCEL) {
        console.warn('Database connection skipped on Vercel due to missing MONGO_URI');
        return null;
      } else {
        throw new Error('MONGO_URI is required');
      }
    }

    // Use cached connection if available
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI, connectOptions).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    logger.info(`MongoDB connected: ${cached.conn.connection.host}`);
    
    // Handle connection events (only once)
    if (!cached.conn._eventsSet) {
      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
      });
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });
      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
      });
      cached.conn._eventsSet = true;
    }

    // Graceful shutdown (only in non-serverless)
    if (!process.env.VERCEL) {
      process.on('SIGINT', async () => {
        logger.info('SIGINT received. Closing MongoDB connection...');
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
        process.exit(0);
      });
      process.on('SIGTERM', async () => {
        logger.info('SIGTERM received. Closing MongoDB connection...');
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
        process.exit(0);
      });
    }

    return cached.conn;
  } catch (error) {
    logger.error('Database connection failed:', error);
    if (process.env.VERCEL) {
      console.warn('Database connection failed on Vercel, but continuing...');
      return null;
    } else {
      process.exit(1);
    }
  }
};

// Disconnect database function
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed successfully');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

// Get database status
export const getDBStatus = () => {
  return {
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    port: mongoose.connection.port,
    config: {
      maxPoolSize: config.database.options.maxPoolSize,
      serverSelectionTimeoutMS: config.database.options.serverSelectionTimeoutMS,
      socketTimeoutMS: config.database.options.socketTimeoutMS
    }
  };
};

// Database health check
export const healthCheck = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Ping the database
      await mongoose.connection.db.admin().ping();
      return { 
        status: 'healthy', 
        message: 'Database is connected and responsive',
        details: getDBStatus()
      };
    } else {
      return { 
        status: 'unhealthy', 
        message: 'Database is not connected',
        details: getDBStatus()
      };
    }
  } catch (error) {
    logger.error('Database health check failed:', error);
    return { 
      status: 'unhealthy', 
      message: 'Database health check failed', 
      error: error.message,
      details: getDBStatus()
    };
  }
};

export default connectDB; 