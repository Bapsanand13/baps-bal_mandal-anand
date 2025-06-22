// Environment configuration
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // App Configuration
  APP_NAME: 'BAPS Bal Mandal',
  APP_VERSION: '1.0.0',
};

export default config; 