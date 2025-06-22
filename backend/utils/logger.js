import fs from 'fs';
import path from 'path';

// Log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Current log level (can be set via environment variable)
const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] || LOG_LEVELS.INFO;

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Get timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Write to log file
const writeToFile = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data })
  };

  const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
  const logString = JSON.stringify(logEntry) + '\n';

  fs.appendFileSync(logFile, logString);
};

// Console output with colors
const consoleOutput = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const colors = {
    ERROR: '\x1b[31m', // Red
    WARN: '\x1b[33m',  // Yellow
    INFO: '\x1b[36m',  // Cyan
    DEBUG: '\x1b[35m', // Magenta
    RESET: '\x1b[0m'   // Reset
  };

  const color = colors[level] || colors.RESET;
  const reset = colors.RESET;

  console.log(`${color}[${level}]${reset} ${timestamp} - ${message}`);
  if (data) {
    console.log(`${color}Data:${reset}`, data);
  }
};

// Logger class
class Logger {
  error(message, data = null) {
    if (currentLogLevel >= LOG_LEVELS.ERROR) {
      writeToFile('ERROR', message, data);
      consoleOutput('ERROR', message, data);
    }
  }

  warn(message, data = null) {
    if (currentLogLevel >= LOG_LEVELS.WARN) {
      writeToFile('WARN', message, data);
      consoleOutput('WARN', message, data);
    }
  }

  info(message, data = null) {
    if (currentLogLevel >= LOG_LEVELS.INFO) {
      writeToFile('INFO', message, data);
      consoleOutput('INFO', message, data);
    }
  }

  debug(message, data = null) {
    if (currentLogLevel >= LOG_LEVELS.DEBUG) {
      writeToFile('DEBUG', message, data);
      consoleOutput('DEBUG', message, data);
    }
  }

  // Request logger middleware
  logRequest(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      try {
        const duration = Date.now() - start;
        const logData = {
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          duration: `${duration}ms`,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        };

        if (res.statusCode >= 400) {
          logger.error(`${req.method} ${req.originalUrl} - ${res.statusCode}`, logData);
        } else {
          logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode}`, logData);
        }
      } catch (error) {
        // Fallback logging if there's an error in the logging itself
        console.error('Logging error:', error);
      }
    });

    next();
  }

  // Error logger
  logError(error, req = null) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      ...(req && {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      })
    };

    this.error('Application Error', errorData);
  }
}

// Create and export logger instance
const logger = new Logger();
export default logger;

// Export individual methods for convenience
export const { error, warn, info, debug, logRequest, logError } = logger; 