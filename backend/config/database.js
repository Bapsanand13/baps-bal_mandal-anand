import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import config, { validateConfig } from './config.js';

// Database connection function
export const connectDB = async () => {
  try {
    // Validate required environment variables
    validateConfig();
    
    const MONGO_URI = config.database.uri;
    const connectOptions = config.database.options;

    // Connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI, connectOptions);
    
    logger.info(`MongoDB connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
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

    return conn;
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
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